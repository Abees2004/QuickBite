from rest_framework import serializers
from users.models import User
from .models import *
from rest_framework.serializers import ModelSerializer
from resturants.models import Restaurant


class PartnerRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerRegister
        fields = '__all__'
        read_only_fields = ['status','partner']

    def validate(self, attrs):
        user = self.context['request'].user

        if user.is_staff:
            raise serializers.ValidationError({'User': 'Already A Partner'})
        if user.is_del:
            raise serializers.ValidationError({'User': 'Already A Delivery Partner'})
        restaurant_name = attrs.get('restaurant_name')
        city = attrs.get('city')
        street_name = attrs.get('street_name')
        pincode = attrs.get('pincode')


        restaurant_exists = Restaurant.objects.filter(
            name__iexact=restaurant_name,
            city__iexact=city,
            pincode=pincode
        ).exists()

        if restaurant_exists:
            raise serializers.ValidationError({
                'restaurant_name': 'Restaurant already exists in this location'
            })

        return attrs
    
class DeliveryPartnerRegisterSerializer(ModelSerializer):
    class Meta:
        model=DeliveryPartnerRegister
        fields='__all__' 
        read_only_fields=['status','delivery_partner'] 

        def validate(self, attrs):
            del_partner = self.context['request'].user
            if not del_partner:
                raise serializers.ValidationError({'User': 'Delivery partner is required'})
            if del_partner.is_staff:
                raise serializers.ValidationError({'User': 'Already A Partner'})
            if del_partner.is_del:
                raise serializers.ValidationError({'User': 'Already A Delivery_Partner'})
            return attrs
        
class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email']

class PartnerApproveSerializer(serializers.ModelSerializer):
    partner=UserDetailsSerializer(read_only=True)
    class Meta:
        model = PartnerRegister
        fields = "__all__"
        read_only_fields = ['partner', 'restaurant_name', 'street_name','city','image', 'pincode']

    def update(self, instance, validated_data):
        old_status = instance.status
        new_status = validated_data.get('status')
        instance.status = new_status
        instance.save()

        if old_status != 'APPROVED' and new_status == 'APPROVED':
            partner = instance.partner
            partner.is_staff = True
            partner.save()

            Restaurant.objects.create(
                partner=partner,
                name=instance.restaurant_name,
                image=instance.image,
                street_name=instance.street_name,
                city=instance.city,
                pincode=instance.pincode,
                is_active=True
            )

        return instance
    
class DeliveryPartnerApproveSerializer(ModelSerializer):
    delivery_partner=UserDetailsSerializer(read_only=True)
    class Meta:
        model=DeliveryPartnerRegister
        fields="__all__"
        read_only_fields=['delivey_partner','age','location']
    
    def update(self, instance, validated_data):
        instance=getattr(self,'instance',None)
        status=validated_data.get('status',getattr(instance,'status',None))
        instance.status=status
        instance.save()
        if instance.status=='APPROVED':
            partner_id=instance.delivery_partner.id
            partner_instance=User.objects.get(id=partner_id)
            partner_instance.is_del=True
            partner_instance.save()
        return instance

