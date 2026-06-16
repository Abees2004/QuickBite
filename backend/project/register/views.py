from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from users.models import User
from rest_framework.permissions import IsAuthenticated,IsAdminUser

# Create your views here.

class PartnerRegisterView(generics.CreateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class=PartnerRegisterSerializer

    def perform_create(self, serializer):
        serializer.save(partner=self.request.user)

class DeliveryPartnerRegisterView(generics.CreateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class=DeliveryPartnerRegisterSerializer

    def perform_create(self, serializer):
        serializer.save(delivery_partner=self.request.user)

class PartnerRequestListView(generics.ListAPIView):
    permission_classes=[IsAdminUser]
    queryset=PartnerRegister.objects.filter(status="PENDING").select_related('partner')
    serializer_class=PartnerApproveSerializer

class PartnerApproveView(generics.RetrieveUpdateAPIView):
    permission_classes=[IsAdminUser]
    queryset=PartnerRegister.objects.filter(status="PENDING").select_related('partner')
    serializer_class=PartnerApproveSerializer

class DeliveryPartnerRequestListView(generics.ListAPIView):
    permission_classes=[IsAdminUser]
    queryset=DeliveryPartnerRegister.objects.filter(status="PENDING").select_related('delivery_partner')
    serializer_class=DeliveryPartnerApproveSerializer

class DeliveryPartnerApproveView(generics.RetrieveUpdateAPIView):
    permission_classes=[IsAdminUser]
    queryset=DeliveryPartnerRegister.objects.filter(status="PENDING").select_related('delivery_partner')
    serializer_class=DeliveryPartnerApproveSerializer