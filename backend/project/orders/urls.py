from django.urls import path
from . import views


urlpatterns = [
    path('address/',views.DeliveryAddressView.as_view()),
    path('place-order/',views.PlaceOrderView.as_view()),
    path('orders/',views.OrderListView.as_view()),
    path('request-orders/',views.OrderRequestListView.as_view()),
    path('orders/<int:pk>/',views.OrderDetailsView.as_view()),
    path('orders-status/<int:pk>/',views.OrderStatusUpdateView.as_view()),
    path('admin-dashboard/',views.AdminDashboardView.as_view()),
]