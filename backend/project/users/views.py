from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from .serializers import LoginSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser


# Create your views here.

class UserRegisterView(generics.CreateAPIView):
    permission_classes=[AllowAny] 
    serializer_class=UserRegisterSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes=[AllowAny] 
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user

class LoginView(APIView):
    permission_classes=[AllowAny] 
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        return Response(
            {
                "success": True,
                "message": "Login successful",
                "data": serializer.validated_data
            },
            status=status.HTTP_200_OK
        )

class UsersListView(generics.ListAPIView):
    permission_classes=[IsAdminUser] 
    queryset=User.objects.filter(is_staff=False,is_del=False)
    serializer_class=UserMangementSerializer

class UserMangementView(generics.RetrieveUpdateAPIView):
    permission_classes=[IsAdminUser] 
    queryset=User.objects.filter(is_superuser=False)
    serializer_class=UserMangementSerializer

class PartnersListView(generics.ListAPIView):
    permission_classes=[IsAdminUser] 
    queryset=User.objects.filter(is_superuser=False,is_staff=True,is_del=False)
    serializer_class=UserMangementSerializer

class DeliveryPartnersListView(generics.ListAPIView):
    permission_classes=[IsAdminUser] 
    queryset=User.objects.filter(is_staff=False,is_del=True)
    serializer_class=UserMangementSerializer









