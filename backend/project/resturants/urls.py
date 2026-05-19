from django.urls import path
from . import views

urlpatterns=[
    path('dashboard/',views.RestaurantDashboardView.as_view()),
    path('restaurants/',views.RestaurantsListView.as_view()),
    path('restaurants/<int:pk>/',views.RestaurantParticularView.as_view()),
    path('restaurant-profile/',views.RestaurantView.as_view()),
    path('restaurant-ratings/<int:restaurant_id>/',views.FoodRatingsView().as_view()),
    path('customer-restaurant-ratings/<int:restaurant_id>/',views.CustomerFoodRatingView().as_view()),
]