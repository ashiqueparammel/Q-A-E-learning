from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from testpages.models import TestPages,Questions,Results,Options
from testpages.serializers import GrammerTests, QuestionsOptions, TestQuestions,TestResults
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from users.models import CustomUser  

class TestAdd(ListCreateAPIView):
    queryset = TestPages.objects.all()
    serializer_class = GrammerTests
    
class TestDetails(RetrieveUpdateDestroyAPIView):
    queryset = TestPages.objects.all()
    serializer_class = GrammerTests         

class QuestionAdd(ListCreateAPIView):
    queryset = Questions.objects.all()
    serializer_class = TestQuestions 
    
class QuestionDetails(RetrieveUpdateDestroyAPIView):
    queryset = Questions.objects.all()
    serializer_class = TestQuestions   

class OptionsAdd(ListCreateAPIView):
    queryset = Options.objects.all()
    serializer_class = QuestionsOptions           
         
class OptionsDetails(RetrieveUpdateDestroyAPIView):
    queryset = Options.objects.all()
    serializer_class = QuestionsOptions    

class ResultsAdd(CreateAPIView):
    def post(self, request, *args, **kwargs):
        serializer = TestResults(data=request.data)

        if serializer.is_valid():
            serializer.save()
            data =serializer.data
            score =data['score']
            pk = data['candidate']
            test_name =data['test_name']
            user=CustomUser.objects.get(id=pk)
            subject = ' WellDone'
            message = f'Hi {user}, Welocme to Test Grammer!!   Your Score:{score}'
            from_email = 'copyc195@gmail.com'
            recipient_list = [user.email]
            send_mail(subject, message, from_email, recipient_list)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
      
         
      

class ResultsDetails(RetrieveUpdateDestroyAPIView):
    queryset = Results.objects.all()
    serializer_class = TestResults 
   



        
           
    
    

    


