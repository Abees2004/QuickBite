from django.shortcuts import render
from rest_framework import generics
from users.models import User
from orders.models import Order
from .serializers import *
from rest_framework.views import APIView,Response,status
from django.shortcuts import get_object_or_404
from cart.models import Cart,CartItem
from django.db.models import Sum, Avg, Count

# Create your views here.

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import DeliveryAddress
from .serializers import DeliveryAddressSerializer


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

class PlaceOrderView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request):
        user_object = self.request.user
        cart_items_list = CartItem.objects.filter(cart__customer=user_object)
        if not cart_items_list.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        restaurant = cart_items_list.first().cart.restaurant
        address = DeliveryAddress.objects.get(user=2)
        total = 0
        for item in cart_items_list:
            total += item.food.price * item.quantity

        order = Order.objects.create(
            customer=user_object,
            restaurant=restaurant,
            total=total,
            street_name=address.street_name,
            city=address.city,
            pincode=address.pincode
        )

        for item in cart_items_list:
            OrderItems.objects.create(
                order=order,
                food=item.food,
                quantity=item.quantity,
                price=item.food.price,
            )

        cart_items_list.delete()

        user_cart = Cart.objects.get(customer=user_object)
        user_cart.restaurant = None
        user_cart.save()

        return Response({'message': 'Order placed successfully'}, status=status.HTTP_200_OK)

class OrderListView(generics.ListAPIView):
    permission_classes=[IsAuthenticated]

    serializer_class = OrderSerializer

    def get_queryset(self):

        user = self.request.user
        if user.is_superuser:
            return Order.objects.all()
        
        elif user.is_staff:
            return Order.objects.filter(
                restaurant__partner=user
            )


        elif user.is_active:
            return Order.objects.filter(
                customer=user
            )


        return Order.objects.none()

class OrderDetailsView(generics.RetrieveAPIView):
    permission_classes=[IsAuthenticated]

    serializer_class = OrderSerializer

    def get_queryset(self):

        user = self.request.user

        # ADMIN
        if user.is_superuser:
            return Order.objects.all()

        # RESTAURANT
        elif user.is_staff:
            return Order.objects.filter(
                restaurant__partner=user
            )


        
        # CUSTOMER
        elif user.is_active:
            return Order.objects.filter(
                customer=user
            )



        return Order.objects.none()

class OrderRequestListView(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):

        user = self.request.user

        # RESTAURANT
        if user.is_staff:
            return Order.objects.filter(
                restaurant__partner=user,status="PENDING"
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


