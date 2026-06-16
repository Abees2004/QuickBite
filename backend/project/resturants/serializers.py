from rest_framework import serializers
from .models import *
from rest_framework.serializers import ModelSerializer
from products.models import FoodItem,RatingReview
from django.db.models import Avg, Min
from users.models import User




class RestaurantDashboardSerializer(serializers.Serializer):
    total_orders = serializers.IntegerField()
    total_revenue = serializers.DecimalField(max_digits=10, decimal_places=2)
    average_rating = serializers.FloatField()
    total_reviews = serializers.IntegerField()
    pending_orders = serializers.IntegerField()

 
class RestaurantsListSerializer(ModelSerializer):
    min_price=serializers.SerializerMethodField()
    rating=serializers.SerializerMethodField()
    class Meta:
        model=Restaurant
        fields=['id','partner','name','image','street_name','city','pincode','is_active','min_price','rating']
    
    def get_min_price(self,obj):
        annotated_min = getattr(obj, 'annotated_min_price', None)
        if annotated_min is not None:
            return {'price__min': annotated_min}
        return(FoodItem.objects.filter(restaurant=obj).aggregate(Min('price'))) 
      
    def get_rating(self, obj):
        rating = getattr(obj, 'annotated_rating', None)
        if rating is not None:
            return round(rating, 1) if rating else 0
        rating = RatingReview.objects.filter(restaurant=obj).aggregate(Avg('rating'))['rating__avg']
        return round(rating, 1) if rating else 0     

class RestaurantsSerializer(ModelSerializer):
    rating=serializers.SerializerMethodField()
    class Meta:
        model=Restaurant
        fields="__all__"

    def get_rating(self, obj):
        rating = getattr(obj, 'annotated_rating', None)
        if rating is not None:
            return round(rating, 1) if rating else 0
        rating = RatingReview.objects.filter(restaurant=obj).aggregate(Avg('rating'))['rating__avg']
        return round(rating, 1) if rating else 0
    




class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=['username','email']

class FoodRatingSerializer(ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = RatingReview
        fields = "__all__"
        read_only_fields = ['user','restaurant']

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        
        return value
    
 

