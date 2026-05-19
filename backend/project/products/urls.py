from django.urls import path
from . import views

urlpatterns=[
    path('restaurant-foods-list/<int:pk>/',views.RestaurantFoodsView.as_view()),

    path('cateogory/',views.CateogoryView.as_view()),

    path('resturant-food-items/',views.FoodItemsView.as_view()),
    path('resturant-food-add/',views.FoodItemAddView.as_view()),
    path('resturant-food/<int:pk>/',views.FoodEditView.as_view()),
]