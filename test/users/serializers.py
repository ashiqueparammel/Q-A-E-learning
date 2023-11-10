from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser

class CustomUser_Serializer(ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True) 
    class Meta:
        model = CustomUser
        fields = '__all__'
        
    def save(self):
        user=CustomUser(
            email =self._validated_data['email'],
            username=self._validated_data['username'],
            first_name=self._validated_data['first_name'],
            last_name=self._validated_data['last_name'],
            country=self._validated_data['country'],
            phone_number=self._validated_data['phone_number'],    
            password =self._validated_data['password'] 
        ) 
        password =self._validated_data['password'] 
        password2 =self._validated_data['password2']  
        if password!=password2:
            raise serializers.ValidationError({'password':'password does not match'})
        user.set_password(password)
        user.save()
        return user 
    
    
class myTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_active'] = user.is_active
        token['is_admin'] = user.is_superuser
       
        return token    