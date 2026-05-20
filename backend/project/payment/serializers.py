from rest_framework_simplejwt import serializers
from rest_framework.serializers import ModelSerializer
from .models import *

class PaymentSerializer(ModelSerializer):
    class Meta:
        model=Payment
        fields=['razorpay_payment_id']