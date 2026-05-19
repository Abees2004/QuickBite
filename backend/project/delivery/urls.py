from django.urls import path
from . import views
from django.urls import path
from .views import *


urlpatterns = [
    path('available-orders/',AvailableOrdersView.as_view(),name='available-orders'),
    path('assign-order/<int:pk>/',AssignOrderView.as_view(),name='assign-order'),
    path('my-orders/',DeliveryPartnerOrdersView.as_view(),name='delivery-partner-orders'),
    path('my-orders/<int:pk>/',DeliveryPartnerSingleOrderView.as_view(),name='delivery-partner-single-order'),
    path('active-orders/',ActiveDeliveryOrdersView.as_view(),name='active-delivery-orders'),
    path('delivered-orders/',DeliveredOrdersView.as_view(),name='delivered-orders'),
    path('update-status/<int:pk>/',DeliveryStatusUpdateView.as_view(),name='delivery-status-update'),
]