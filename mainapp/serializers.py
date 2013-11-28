from django.forms import widgets
from rest_framework import serializers
from mainapp.models import Dataset, Variable

class DatasetSerializer(serializers.ModelSerializer***REMOVED***:
  class Meta:
    model = Dataset
    fields = ('id', 'name'***REMOVED***

class VariableSerializer(serializers.ModelSerializer***REMOVED***:
  class Meta:
    model = Variable
    fields = ('id', 'name', 'dataset'***REMOVED***
