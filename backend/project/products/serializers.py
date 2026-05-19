from rest_framework.serializers import ModelSerializer
from products.models import *
from rest_framework import serializers
from users.models import User


class RestaurantFoodsSerializer(ModelSerializer):
    class Meta:
        model=FoodItem
        fields="__all__"


class FoodCategorySerializer(ModelSerializer):
    class Meta:
        model=FoodCategory
        fields='__all__'

class FoodItemSerializer(ModelSerializer):
    category=FoodCategorySerializer(read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=FoodCategory.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model=FoodItem
        fields="__all__"
        read_only_fields = ['restaurant']



