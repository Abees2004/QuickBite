from django.urls import path
from . import views


urlpatterns = [
    path('partner-register/',views.PartnerRegisterView.as_view()),
    path('delivery-partner-register/',views.DeliveryPartnerRegisterView.as_view()),
    path('partner-requests/',views.PartnerRequestListView.as_view()),
    path('delivery-partner-requests/',views.DeliveryPartnerRequestListView.as_view()),
    path('partner-approve/<int:pk>/',views.PartnerApproveView.as_view()),
    path('delivery-partner-approve/<int:pk>/',views.DeliveryPartnerApproveView.as_view()),
]