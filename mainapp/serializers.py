from django.forms import widgets
from rest_framework import serializers
from mainapp.models import Dataset, Variable
from django.contrib.auth.models import User
import ast

#define a custom field class for data serialization
class ArrayField(serializers.WritableField***REMOVED***:
  def to_native(self, obj***REMOVED***:
    return obj
  def from_native(self, value***REMOVED***:
    return ast.literal_eval(value***REMOVED***

class DatasetSerializer(serializers.ModelSerializer***REMOVED***:
  variables = serializers.PrimaryKeyRelatedField(many=True***REMOVED***
  owner = serializers.Field(source='owner.username'***REMOVED***
  class Meta:
    model = Dataset
    fields = ('id', 'name', 'owner'***REMOVED***

class VariableSerializer(serializers.ModelSerializer***REMOVED***:
  data = ArrayField(***REMOVED***
  class Meta:
    model = Variable
    fields = ('id', 'name', 'dataset', 'datatype', 'data'***REMOVED***

class UserSerializer(serializers.ModelSerializer***REMOVED***:
  datasets = serializers.PrimaryKeyRelatedField(many=True***REMOVED***
  class Meta:
    model = User
    fields = ('id', 'username', 'datasets'***REMOVED***

