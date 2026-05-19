from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from products.serializers import FoodItemSerializer
from .models import *
from users.models import User

class CartSerializer(ModelSerializer):
    food=FoodItemSerializer(read_only=True)
    class Meta:
        model=CartItem
        fields="__all__"

class CartFoodAddSerializer(ModelSerializer):
    class Meta:
        model = CartItem
        fields = "__all__"
        read_only_fields = ['cart','quantity']

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        food = validated_data["food"]
        user = self.context['request'].user
        cart = Cart.objects.get(customer=user)

        if cart.restaurant != food.restaurant:
            CartItem.objects.filter(cart=cart).delete()
            cart.restaurant = food.restaurant
            cart.save()

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            food=food,
        )

        if not created:
            cart_item.quantity += 1
            cart_item.save()

        return cart_item

class CartFoodQtyIncreaseSerializer(ModelSerializer):
    food = FoodItemSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = "__all__"
        read_only_fields = ['cart', 'food', 'quantity']

    def update(self, instance, validated_data):
        instance.quantity += 1
        instance.save()
        return instance
    
class CartFoodQtyDecreaseSerializer(ModelSerializer):
    food = FoodItemSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = "__all__"
        read_only_fields = ['cart', 'food', 'quantity']

    def update(self, instance, validated_data):
        if instance.quantity <= 1:
            instance.delete()
            raise serializers.ValidationError("Item removed from cart")

        instance.quantity -= 1
        instance.save()
        return instance
    

