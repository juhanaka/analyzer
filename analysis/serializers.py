from rest_framework import serializers
from api.serializers import ArrayField
from api.models import Variable, Dataset
from django.http import Http404
import json
import ast

class VariableField(serializers.Field***REMOVED***:

  def to_native(self, obj***REMOVED***:
    return obj

  def from_native(self, value***REMOVED***:
    return Variable.objects.get(id=value***REMOVED***


class LinearRegressionSerializer(***REMOVED***:
  def __init__(self, data***REMOVED***:
    dataset = data.get('dataset', None***REMOVED***
    x = data.get('x', None***REMOVED***
    y = data.get('y', None***REMOVED***

    dataset = dataset.encode('utf-8'***REMOVED*** if dataset else None
    x = x.encode('utf-8'***REMOVED*** if x else None
    y = y.encode('utf-8'***REMOVED*** if y else None

    try:
      self.dataset = Dataset.objects.get(id=dataset***REMOVED***
    except Dataset.DoesNotExist:
      self.dataset = None
    try:
      self.x = Variable.objects.get(dataset__pk=dataset, pk=x***REMOVED***
    except Variable.DoesNotExist:
      self.x = None
    try:
      self.y = Variable.objects.get(dataset__pk=dataset, pk=y***REMOVED***
    except Variable.DoesNotExist:
      self.y = None
    self.data = {'x':self.x, 'y': self.y, 'dataset': self.dataset***REMOVED***

  def is_valid(self***REMOVED***:
    if not isinstance(self.dataset, Dataset***REMOVED***:
      return False
    elif not (isinstance(self.x, Variable***REMOVED*** and isinstance(self.y, Variable***REMOVED******REMOVED***:
      return False
    return True
