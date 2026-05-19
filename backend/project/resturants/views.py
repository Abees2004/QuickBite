from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from users.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from common.filters import RestaurantFilter
from orders.models import Order
from rest_framework.views import APIView,status,Response
from django.db.models import Sum, Avg, Count
from common.permissions import IsStaffUser
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Avg, Count
from products.models import RatingReview

class RestaurantDashboardView(APIView):
    permission_classes=[IsStaffUser]

    def get(self, request):

        restaurant = Restaurant.objects.filter(
            partner=request.user
        ).first()

        if not restaurant:
            return Response(
                {"message": "Restaurant not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        orders_qs = Order.objects.filter(
            restaurant__partner=request.user
        )

        total_orders = orders_qs.count()

        pending_orders = orders_qs.filter(
            status='pen'
        ).count()

        total_revenue = orders_qs.aggregate(
            revenue=Sum('total')
        )['revenue'] or 0

        ratings_qs = RatingReview.objects.filter(
            restaurant=restaurant
        )

        rating_data = ratings_qs.aggregate(
            average_rating=Avg('rating'),
            total_reviews=Count('id')
        )

        response_data = {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "average_rating": round(
                rating_data['average_rating'] or 0,
                1
            ),
            "total_reviews": rating_data['total_reviews'],
            "pending_orders": pending_orders
        }

        serializer = RestaurantDashboardSerializer(response_data)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class RestaurantsListView(generics.ListAPIView):
    permission_classes=[AllowAny] 
    queryset=Restaurant.objects.filter(is_active=True)
    serializer_class=RestaurantsListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = RestaurantFilter
    search_fields = [
        'name',
        'city',
        'street_name',
        'fooditem__name',
        'fooditem__category__name',
    ]


class RestaurantParticularView(generics.RetrieveAPIView):
    permission_classes=[AllowAny] 
    queryset=Restaurant.objects.all()
    serializer_class=RestaurantsSerializer


class RestaurantView(generics.RetrieveUpdateAPIView):
    permission_classes=[IsStaffUser]
    serializer_class = RestaurantsSerializer
    def get_object(self):
        return Restaurant.objects.get(partner=self.request.user)
    




class FoodRatingsView(generics.ListAPIView):
    permission_classes=[AllowAny]  
    serializer_class=FoodRatingSerializer
    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        return RatingReview.objects.filter(restaurant_id=restaurant_id)
    
class CustomerFoodRatingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, restaurant_id):
        rating = RatingReview.objects.filter(
            restaurant_id=restaurant_id,
            user=request.user
        ).first()

        if not rating:
            return Response({"msg": "No rating found"}, status=404)

        return Response({
            "rating": rating.rating,
            "review": rating.review
        })

    def post(self, request, restaurant_id):
        restaurant =Restaurant.objects.get(pk=restaurant_id)
        user = request.user

        serializer = FoodRatingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        rating, created = RatingReview.objects.update_or_create(
            user=user,
            restaurant=restaurant,
            defaults=serializer.validated_data
        )

        return Response({
            "msg": "Created" if created else "Updated",
            "rating": rating.rating,
            "review": rating.review
        }, status=status.HTTP_200_OK)
    

