from rest_framework import serializers
from .models import *
from resturants.models import Restaurant
from products.models import FoodItem
from users.models import User
from rest_framework import serializers



class DeliveryAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryAddress
        fields = "__all__"
        read_only_fields = ['user']  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = [
            'id',
            'name',
            'image',
            'street_name',
            'city',
            'pincode'
        ]

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = [
            'id',
            'name',
            'image',
            'price'
        ]

class OrderItemSerializer(serializers.ModelSerializer):

    food = FoodSerializer(read_only=True)

    class Meta:
        model = OrderItems
        fields = [
            'id',
            'food',
            'quantity',
            'price'
        ]

class OrderSerializer(serializers.ModelSerializer):

    customer = UserSerializer(read_only=True)

    restaurant = RestaurantSerializer(read_only=True)

    Delivery_partner = UserSerializer(read_only=True)

    items = serializers.SerializerMethodField()

    image = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = "__all__"

    def get_items(self, obj):

        items = obj.orderitems_set.select_related(
            'food'
        )

        return OrderItemSerializer(
            items,
            many=True
        ).data

    def get_image(self, obj):

        item = obj.orderitems_set.select_related(
            'food'
        ).first()

        if item and item.food.image:
            return item.food.image.url

        return None

class OrderStatusUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['status']

    def validate_status(self, value):

        allowed_status = [
        'PENDING',
        'APPROVED',
        'REJECTED'
        ]

        if value not in allowed_status:
            raise serializers.ValidationError(
                "Invalid status"
            )

        return value















class AdminDashboardSerializer(serializers.Serializer):
    total_revenue=serializers.IntegerField()
    total_orders=serializers.IntegerField()
    total_partners=serializers.IntegerField()
    total_delivery_partners=serializers.IntegerField() 