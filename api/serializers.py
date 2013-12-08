from django.forms import widgets
from rest_framework import serializers
from api.models import Dataset, Variable
from django.contrib.auth.models import User
import ast

#define a custom field class for data serialization
class ArrayField(serializers.Field***REMOVED***:

  def to_native(self, obj***REMOVED***:
    return obj

  def from_native(self, value***REMOVED***:
    return ast.literal_eval(value***REMOVED***

class DatasetSerializer(serializers.Serializer***REMOVED***:
  pk = serializers.Field(***REMOVED***
  name = serializers.CharField(required=True, max_length=200***REMOVED***
  owner = serializers.Field(source='owner.username'***REMOVED***
  variables = serializers.PrimaryKeyRelatedField(many=True, read_only=True***REMOVED***
  
  def restore_object(self, attrs, instance=None***REMOVED***:
    if instance:
      # Update existing instance
      instance.name = attrs.get('name', instance.name***REMOVED***
      return instance
    # Create new instance
    return Dataset(**attrs***REMOVED***

class VariableSerializer(serializers.ModelSerializer***REMOVED***:
  values = ArrayField(***REMOVED***
  
  class Meta:
    model = Variable
    fields = ('id', 'name', 'dataset', 'datatype', 'subtype', 'values'***REMOVED***
    read_only_fields = ('id', 'dataset', 'datatype'***REMOVED***

class UserSerializer(serializers.ModelSerializer***REMOVED***:
  datasets = serializers.PrimaryKeyRelatedField(many=True***REMOVED***
  class Meta:
    model = User
    fields = ('id', 'username', 'datasets'***REMOVED***