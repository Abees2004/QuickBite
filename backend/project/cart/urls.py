from django.urls import path
from . import views

urlpatterns=[
    path('cart/',views.CartView.as_view()),
    path('cart-food-add/',views.CartFoodAddView.as_view()),
    path('cart-food-remove/<int:pk>/',views.CartFoodRemoveView.as_view()),
    path('cart-food-quantity-increase/<int:pk>/',views.CartFoodQuantityIncreaseView.as_view()),
    path('cart-food-quantity-decrease/<int:pk>/',views.CartFoodQuantityDecreaseView.as_view())
]