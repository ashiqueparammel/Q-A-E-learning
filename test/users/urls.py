from django.urls import path
from . import views

urlpatterns = [
    path('token/',views.MyTokenObtainPairView.as_view(), name='MyTokenObtainPairView'),
    path('signup/',views.Signup.as_view(), name='sign_up'),
]