from django.shortcuts import render
from rest_framework import generics
from products.models import FoodItem
from users.models import User
from .serializers import *
from resturants.models import Restaurant
from rest_framework.permissions import IsAuthenticated,AllowAny
from common.permissions import IsStaffUser

# Create your views here.


class RestaurantFoodsView(generics.ListAPIView): 
    permission_classes=[AllowAny] 
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return FoodItem.objects.filter(restaurant_id=pk).order_by('category_id')
    serializer_class=RestaurantFoodsSerializer

class CateogoryView(generics.ListAPIView):
    permission_classes=[AllowAny] 
    queryset=FoodCategory.objects.all()
    serializer_class=FoodCategorySerializer

class FoodItemsView(generics.ListAPIView):
    permission_classes=[IsStaffUser]
    serializer_class = FoodItemSerializer

    def get_queryset(self):
        return FoodItem.objects.filter(
            restaurant__partner=self.request.user
        ).select_related('category')

class FoodItemAddView(generics.CreateAPIView):
    permission_classes=[IsStaffUser]
    serializer_class = FoodItemSerializer

    def perform_create(self, serializer):
        partner = self.request.user
        restaurant = Restaurant.objects.get(partner=partner)
        serializer.save(restaurant=restaurant)

class FoodEditView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FoodItemSerializer
    permission_classes=[IsStaffUser]

    def get_queryset(self):
        return FoodItem.objects.filter(
            restaurant__partner=self.request.user
        ).select_related('category')
    



