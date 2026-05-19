from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns=[
    path('user-register/',views.UserRegisterView.as_view(),name='register'),
    path('user-profile/',views.UserProfileView.as_view()),
    path('login/',views.LoginView.as_view()),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users-list/', views.UsersListView.as_view()),
    path('partners-list/', views.PartnersListView.as_view()),
    path('delivery-partners-list/', views.DeliveryPartnersListView.as_view()),
    path('users/<int:pk>/', views.UserMangementView.as_view()),

]  
