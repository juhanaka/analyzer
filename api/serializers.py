from django.forms import widgets
from rest_framework import serializers
from api.models import Dataset, Variable
from django.contrib.auth.models import User
import ast

#define a custom field class for data serialization
class ArrayField(serializers.Field):
  def to_native(self, obj):
    return obj

  def from_native(self, value):
    return ast.literal_eval(value)

class DatasetSerializer(serializers.Serializer):
  pk = serializers.Field()
  name = serializers.CharField(required=True, max_length=200)
  owner = serializers.Field(source='owner.username')
  variables = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
  
  def restore_object(self, attrs, instance=None):
    if instance:
      # Update existing instance
      instance.name = attrs.get('name', instance.name)
      return instance
    # Create new instance
    return Dataset(**attrs)

class VariableSerializer(serializers.ModelSerializer):
  values = ArrayField()
  
  class Meta:
    model = Variable
    fields = ('id', 'name', 'dataset', 'datatype', 'subtype', 'values')
    read_only_fields = ('id', 'dataset', 'datatype')

class UserSerializer(serializers.ModelSerializer):
  datasets = serializers.PrimaryKeyRelatedField(many=True)

  class Meta:
    model = User
    fields = ('id', 'username', 'datasets')