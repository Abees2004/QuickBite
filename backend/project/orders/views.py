from django.shortcuts import render
from rest_framework import generics
from users.models import User
from orders.models import Order
from .serializers import *
from rest_framework.views import APIView,Response,status
from django.shortcuts import get_object_or_404
from cart.models import Cart,CartItem
from django.db.models import Sum, Avg, Count
from rest_framework.permissions import IsAuthenticated
from .models import DeliveryAddress
from .serializers import DeliveryAddressSerializer
from payment.models import Payment
import razorpay
from django.conf import settings




class DeliveryAddressView(generics.ListAPIView,generics.UpdateAPIView):
    serializer_class = DeliveryAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DeliveryAddress.objects.filter(
            user=self.request.user
        )

    def get_object(self):
        return get_object_or_404(
            DeliveryAddress,
            user=self.request.user
        )

class OrderListView(generics.ListAPIView):
    permission_classes=[IsAuthenticated]

    serializer_class = OrderSerializer

    def get_queryset(self):

        user = self.request.user
        if user.is_superuser:
            queryset = Order.objects.all()
        
        elif user.is_staff:
            queryset = Order.objects.filter(
                restaurant__partner=user
            )

        elif user.is_active:
            queryset = Order.objects.filter(
                customer=user
            )
        else:
            return Order.objects.none()

        return queryset.select_related(
            'customer', 'restaurant', 'Delivery_partner'
        ).prefetch_related(
            'orderitems_set__food'
        )

class OrderDetailsView(generics.RetrieveAPIView):
    permission_classes=[IsAuthenticated]

    serializer_class = OrderSerializer

    def get_queryset(self):

        user = self.request.user

        # ADMIN
        if user.is_superuser:
            queryset = Order.objects.all()

        # RESTAURANT
        elif user.is_staff:
            queryset = Order.objects.filter(
                restaurant__partner=user
            )
        
        # CUSTOMER
        elif user.is_active:
            queryset = Order.objects.filter(
                customer=user
            )
        else:
            return Order.objects.none()

        return queryset.select_related(
            'customer', 'restaurant', 'Delivery_partner'
        ).prefetch_related(
            'orderitems_set__food'
        )

class OrderRequestListView(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):

        user = self.request.user

        # RESTAURANT
        if user.is_staff:
            return Order.objects.filter(
                restaurant__partner=user, status="PLACED"
            ).select_related(
                'customer', 'restaurant', 'Delivery_partner'
            ).prefetch_related(
                'orderitems_set__food'
            )
        return Order.objects.none()

class OrderStatusUpdateView(generics.UpdateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = OrderStatusUpdateSerializer

    def get_queryset(self):

        user = self.request.user

        if user.is_staff:
            return Order.objects.filter(
                restaurant__partner=user
            )

        # elif user.is_superuser:
        #     return Order.objects.all()

        return Order.objects.none()
    






class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        cart_items = CartItem.objects.filter(cart__customer=user).select_related('food', 'cart__restaurant')

        if not cart_items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST
            )

        restaurant = cart_items[0].cart.restaurant

        try:
            address = DeliveryAddress.objects.get(user=user)
        except DeliveryAddress.DoesNotExist:
            return Response(
                {"error": "Address not found"},
                status=status.HTTP_400_BAD_REQUEST
            )

        total = 0

        for item in cart_items:
            total += item.food.price * item.quantity

        # Razorpay amount in paisa
        razorpay_amount = total * 100

        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

        razorpay_order = client.order.create({
            "amount": razorpay_amount,
            "currency": "INR",
            "payment_capture": 1
        })

        # Create payment
        payment = Payment.objects.create(
            user=user,
            amount=total,
            razorpay_order_id=razorpay_order["id"],
            status="PENDING"
        )

        # Create order
        order = Order.objects.create(
            customer=user,
            restaurant=restaurant,
            total=total,
            street_name=address.street_name,
            city=address.city,
            pincode=address.pincode,
            payment=payment,
            status="PENDING"
        )

        # Create order items
        for item in cart_items:
            OrderItems.objects.create(
                order=order,
                food=item.food,
                quantity=item.quantity,
                price=item.food.price,
            )

        return Response({
            "message": "Order created",
            "order_id": order.id,
            "razorpay_order_id": razorpay_order["id"],
            "amount": razorpay_amount,
            "key": settings.RAZORPAY_KEY_ID
        })





















class AdminDashboardView(APIView):
    def get(self,request):
        orders_qs=Order.objects.all()

        partner_qs=User.objects.filter(is_staff=True,is_superuser=False)

        delivery_partners_qs=User.objects.filter(is_del=True)

        total_revenue = orders_qs.aggregate(
            revenue=Sum('total')
        )['revenue'] or 0

        total_orders=orders_qs.count()

        total_partners=partner_qs.count()

        total_delivery_partners=delivery_partners_qs.count()

        response_data={
            'total_revenue':total_revenue,
            'total_orders':total_orders,
            'total_partners':total_partners,
            'total_delivery_partners':total_delivery_partners
        }

        serializer=AdminDashboardSerializer(response_data)
        return Response(serializer.data, status=status.HTTP_200_OK)


