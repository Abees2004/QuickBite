from django.urls import path
from . import views


urlpatterns = [
    path('verify-payment/',views.VerifyPaymentView.as_view()),
]