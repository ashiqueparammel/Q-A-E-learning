import json
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from .models import CustomUser
from rest_framework.response import Response
from .serializers import CustomUser_Serializer, myTokenObtainPairSerializer


class Signup(APIView): 
    def post(self,request): 
        serializer=CustomUser_Serializer(data=request.data)
        if serializer.is_valid():
            data = {} 
            account =serializer.save()
            data['response']='registerd'        
        else:
            statusText = serializer.errors
            
            statusText =json.dumps(statusText)
            
            data = {
            'Text': statusText,
            'status': 404
            }   
            
        return Response(data) 
    

class MyTokenObtainPairView(TokenObtainPairView): 
    serializer_class = myTokenObtainPairSerializer 