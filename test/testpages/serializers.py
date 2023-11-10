from rest_framework.serializers import ModelSerializer
from testpages.models import TestPages,Questions,Options,Results

class GrammerTests(ModelSerializer):
    class Meta:
        model = TestPages
        fields ='__all__'

class TestQuestions(ModelSerializer):
    page_headline = GrammerTests()
    class Meta:
        model = Questions   
        fields = '__all__'

class QuestionsOptions(ModelSerializer):
    question = TestQuestions()
    class Meta:
        model = Options
        fields = '__all__'

class TestResults(ModelSerializer):
    class Meta:
        model = Results
        fields = '__all__'                
        