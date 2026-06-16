from django.shortcuts import render
from .serializers import *
from orders.models import *
from rest_framework import generics
from common.permissions import IsDeliveryUser


# Create your views here.

class AvailableOrdersView(generics.ListAPIView):
    permission_classes=[IsDeliveryUser]
    serializer_class = OrderSerializer

    def get_queryset(self):

        return Order.objects.filter(
            status='APPROVED'
        ).select_related(
            'restaurant',
            'customer',
            'Delivery_partner'
        ).prefetch_related(
            'orderitems_set__food'
        )
    
class AssignOrderView(generics.UpdateAPIView):
    permission_classes=[IsDeliveryUser]
    serializer_class = DeliveryAssignSerializer

    queryset = Order.objects.filter(
        status='APPROVED'
    )

class DeliveryPartnerOrdersView(generics.ListAPIView):
    permission_classes=[IsDeliveryUser]
    serializer_class = OrderSerializer

    def get_queryset(self):

        return Order.objects.filter(
            Delivery_partner=self.request.user
        ).select_related(
            'restaurant',
            'customer',
            'Delivery_partner'
        ).prefetch_related(
            'orderitems_set__food'
        )


class DeliveryPartnerSingleOrderView(generics.RetrieveAPIView):
    permission_classes=[IsDeliveryUser]
    serializer_class = OrderSerializer

    def get_queryset(self):

        return Order.objects.filter(
            Delivery_partner=self.request.user
        ).select_related(
            'restaurant',
            'customer',
            'Delivery_partner'
        ).prefetch_related(
            'orderitems_set__food'
        )

    

class ActiveDeliveryOrdersView(generics.ListAPIView):
    permission_classes=[IsDeliveryUser]
    serializer_class = OrderSerializer

    def get_queryset(self):

        return Order.objects.filter(
            Delivery_partner=self.request.user,
            status__in=['ASSIGNED', 'PICKED']
        ).select_related(
            'restaurant',
            'customer',
            'Delivery_partner'
        ).prefetch_related(
            'orderitems_set__food'
        )
    
class DeliveredOrdersView(generics.ListAPIView):
    permission_classes=[IsDeliveryUser]
    serializer_class = OrderSerializer

    def get_queryset(self):

        return Order.objects.filter(
            Delivery_partner=self.request.user,
            status='DELIVERED'
        ).select_related(
            'restaurant',
            'customer',
            'Delivery_partner'
        ).prefetch_related(
            'orderitems_set__food'
        )
    
class DeliveryStatusUpdateView(generics.UpdateAPIView):
    permission_classes=[IsDeliveryUser]
    serializer_class = DeliveryStatusSerializer

    def get_queryset(self):

        return Order.objects.filter(
            Delivery_partner=self.request.user
        )






































