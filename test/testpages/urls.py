from django.urls import path
from . import views

urlpatterns = [
    path('testadd/',views.TestAdd.as_view(), name='TestAdd'),
    path('testdetails/<int:pk>/',views.TestDetails.as_view(), name='TestDetails'),
    path('questionadd/',views.QuestionAdd.as_view(), name='QuestionAdd'),
    path('questiondetails/<int:pk>/',views.QuestionDetails.as_view(), name='QuestionDetails'),
    path('optionsadd/',views.OptionsAdd.as_view(), name='OptionsAdd'),
    path('optionsdetails/<int:pk>/',views.OptionsDetails.as_view(), name='OptionsDetails'),
    path('resultsadd/',views.ResultsAdd.as_view(), name='ResultsAdd'),
    path('resultsdetails/<int:pk>/',views.ResultsDetails.as_view(), name='ResultsDetails'),
 
]