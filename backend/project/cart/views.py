from django.shortcuts import render
from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from users.models import User
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class CartView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return CartItem.objects.filter(cart__customer=user).select_related('food', 'food__category')
    

class CartFoodAddView(generics.CreateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class=CartFoodAddSerializer

class CartFoodRemoveView(generics.DestroyAPIView):
    permission_classes=[IsAuthenticated]
    queryset=CartItem.objects.all()

class CartFoodQuantityIncreaseView(generics.RetrieveUpdateAPIView):
    permission_classes=[IsAuthenticated]
    queryset=CartItem.objects.all()
    serializer_class=CartFoodQtyIncreaseSerializer

class CartFoodQuantityDecreaseView(generics.RetrieveUpdateAPIView):
    permission_classes=[IsAuthenticated]
    queryset=CartItem.objects.all()
    serializer_class=CartFoodQtyDecreaseSerializer


