import razorpay
from django.conf import settings
import requests
from django.core.cache import cache


client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)

