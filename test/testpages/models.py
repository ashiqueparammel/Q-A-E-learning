from django.db import models
from users.models import CustomUser

class TestPages(models.Model):
    heading = models.TextField(blank=True)
    description = models.TextField(blank=True)

class Questions(models.Model):  
    page_headline = models.ForeignKey(TestPages,on_delete=models.CASCADE)  
    question = models.TextField(blank=False)

class Options(models.Model):    
    option = models.TextField(blank=False)
    question = models.ForeignKey(Questions,on_delete=models.CASCADE)
    is_correct = models.BooleanField(default=False)

class Results(models.Model):
    score = models.CharField(max_length=10,blank=False)
    candidate = models.ForeignKey(CustomUser,on_delete=models.DO_NOTHING)
    test_name = models.ForeignKey(TestPages,on_delete=models.DO_NOTHING)
    
 