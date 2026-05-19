from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from cart.models import Cart
from orders.models import DeliveryAddress

class UserRegisterSerializer(ModelSerializer):
    confirm_password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username','email','password','confirm_password']
    
    def validate(self, data):
        username=data.get('name')
        email=data.get('email')
        password=data.get('password')
        confirm_password=data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError('Password Mismatch')
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError('UserName Already Exists')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email Already Exists')
        
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user=User.objects.create_user(**validated_data)
        Cart.objects.create(customer=user)
        DeliveryAddress.objects.create(user=user) 
        return user  

class UserUpdateSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','bio','phno','image']
    
    def validate(self, attrs):
        instance=getattr(self,'instance',None)
        username=attrs.get('username',getattr(instance,'username',None))
        email=attrs.get('email',getattr(instance,'email',None))
        if User.objects.filter(username=username).exclude(pk=getattr(instance,'pk')).exists():
            raise serializers.ValidationError('Name already taken')
        if User.objects.filter(email=email).exclude(pk=getattr(instance,'pk')).exists():
            raise serializers.ValidationError('Email already taken',)
        return attrs

class UserMangementSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=["id","last_login","is_superuser","username","first_name","last_name",
                "email","is_staff","is_active","date_joined","groups","user_permissions"  
        ]    
        read_only_fields=["id","last_login","is_superuser","username","first_name","last_name",
                "email","is_staff","date_joined","groups","user_permissions"  
        ] 

    def update(self, instance, validated_data):
        instance=getattr(self,'instance',None)
        is_active=validated_data.get('is_active',getattr(instance,'is_active',None))
        instance.is_active=is_active
        instance.save()
        return instance
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError("Invalid username or password")

        if not user.is_active:
            raise serializers.ValidationError("Account is disabled")

        refresh = RefreshToken.for_user(user)


        if user.is_superuser:
            role = "admin"

        elif user.is_staff:
            role = "restaurant"

        elif user.is_del:
            role = "delivery_partner"

        else:
            role = "user"

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "role": role,
            }
        }         