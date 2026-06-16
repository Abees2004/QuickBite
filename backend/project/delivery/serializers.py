from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from orders.models import *
from resturants.models import *
from users.models import User
from products.models import FoodItem



class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RestaurantSerializer(ModelSerializer):

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



class FoodSerializer(ModelSerializer):

    class Meta:
        model = FoodItem
        fields = [
            'id',
            'name',
            'image',
            'price'
        ]



class OrderItemSerializer(ModelSerializer):

    food = FoodSerializer(read_only=True)

    class Meta:
        model = OrderItems
        fields = "__all__"



class OrderSerializer(ModelSerializer):

    restaurant = RestaurantSerializer(read_only=True)

    customer = UserSerializer(read_only=True)

    Delivery_partner = UserSerializer(read_only=True)

    items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = "__all__"

    def get_items(self, obj):

        items = obj.orderitems_set.all()

        return OrderItemSerializer(
            items,
            many=True
        ).data
    


class DeliveryAssignSerializer(ModelSerializer):

    class Meta:
        model = Order
        fields = ['status']

    def validate(self, attrs):

        user = self.context['request'].user
        order = self.instance

        if order.Delivery_partner:
            raise serializers.ValidationError(
                "Delivery partner already assigned."
            )

        if user.is_busy:
            raise serializers.ValidationError(
                "You already have active delivery."
            )

        if attrs.get('status') != 'ASSIGNED':
            raise serializers.ValidationError(
                "Only assigned status allowed."
            )

        return attrs

    def update(self, instance, validated_data):

        user = self.context['request'].user
  

        instance.Delivery_partner = user
        instance.status = 'ASSIGNED'
        instance.save()

        user.is_busy = True
        user.save()

        return instance
    


class DeliveryStatusSerializer(ModelSerializer):

    class Meta:
        model = Order
        fields = ['status']

    def validate_status(self, value):

        if value not in ['PICKED', 'DELIVERED']:
            raise serializers.ValidationError(
                "Only picked or delivered allowed."
            )

        return value

    def update(self, instance, validated_data):

        status = validated_data.get('status')

        if instance.status == 'ASSIGNED' and status == 'DELIVERED':
            raise serializers.ValidationError(
                "Pick order first."
            )

        instance.status = status
        instance.save()

        if status == 'DELIVERED' and instance.Delivery_partner:

            partner = instance.Delivery_partner
            partner.is_busy = False
            partner.save()

        return instance






