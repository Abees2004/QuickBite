from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView,Response
from .models import *
from cart.models import CartItem
from django.conf import settings
from .services import client
import razorpay
from orders.models import Order
from rest_framework.permissions import IsAuthenticated
from cart.models import Cart

# Create your views here.

class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        razorpay_order_id = request.data.get("razorpay_order_id")
        razorpay_payment_id = request.data.get("razorpay_payment_id")
        razorpay_signature = request.data.get("razorpay_signature")

        payment = Payment.objects.filter(
            razorpay_order_id=razorpay_order_id
        ).first()

        if not payment:
            return Response(
                {"message": "Payment not found"},
                status=404
            )

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET
            )
        )

        try:

            # Verify Razorpay signature
            client.utility.verify_payment_signature({
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": razorpay_payment_id,
                "razorpay_signature": razorpay_signature
            })

            # Update payment
            payment.status = "SUCCESS"
            payment.razorpay_payment_id = razorpay_payment_id
            payment.save()

            # Update orders
            orders = Order.objects.filter(payment=payment)

            orders.update(status="PLACED")

            # Clear cart after successful payment
            cart_items = CartItem.objects.filter(
                cart__customer=user
            )

            cart_items.delete()

            # Reset cart restaurant
            user_cart = Cart.objects.get(customer=user)

            user_cart.restaurant = None
            user_cart.save()

            return Response({
                "message": "Payment successful",
                "payment_id": razorpay_payment_id,
                "order_ids": list(
                    orders.values_list("id", flat=True)
                )
            })

        except Exception as e:

            payment.status = "FAILED"
            payment.save()

            Order.objects.filter(
                payment=payment
            ).update(status="FAILED")

            return Response({
                "message": "Payment verification failed",
                "error": str(e)
            }, status=400)
        

