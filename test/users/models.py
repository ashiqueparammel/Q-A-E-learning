from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
class CustomUser(AbstractUser):
    email = models.EmailField(max_length=250, unique=True)
    country = models.CharField(max_length=100)
    phone_number = PhoneNumberField(blank=True,unique=True)
    