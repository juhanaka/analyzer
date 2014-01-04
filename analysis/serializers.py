from rest_framework import serializers
from api.serializers import ArrayField
from api.models import Variable, Dataset
from django.http import Http404
import json
import ast
import numpy as np

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

class OneSampleTTestSerializer(***REMOVED***:
  def __init__(self, data***REMOVED***:
    dataset = data.get('dataset', None***REMOVED***
    variable = data.get('variable',None***REMOVED***
    mean = data.get('mean', None***REMOVED***
    dataset = dataset.encode('utf-8'***REMOVED*** if dataset else None
    variable = variable.encode('utf-8'***REMOVED*** if variable else None
    self.mean = np.float64(mean.encode('utf-8'***REMOVED******REMOVED*** if mean else None

    try:
      self.dataset = Dataset.objects.get(id=dataset***REMOVED***
    except Dataset.DoesNotExist:
      self.dataset = None
    try:
      self.variable = Variable.objects.get(dataset__pk=dataset, pk=variable***REMOVED***
    except Variable.DoesNotExist:
      self.variable = None

    self.data = {'dataset': self.dataset, 'variable': self.variable, 'mean': self.mean***REMOVED***

  def is_valid(self***REMOVED***:
    if not isinstance(self.dataset, Dataset***REMOVED***:
      return False
    if not isinstance(self.variable, Variable***REMOVED***:
      return False
    if not self.mean:
      return False
    return True

class TwoSampleTTestSerializer(***REMOVED***:
  def __init__(self, data***REMOVED***:
    dataset = data.get('dataset', None***REMOVED***
    variable_1 = data.get('variable_1',None***REMOVED***
    variable_2 = data.get('variable_2',None***REMOVED***
    dataset = dataset.encode('utf-8'***REMOVED*** if dataset else None
    variable_1 = variable_1.encode('utf-8'***REMOVED*** if variable_1 else None
    variable_2 = variable_2.encode('utf-8'***REMOVED*** if variable_2 else None

    try:
      self.dataset = Dataset.objects.get(id=dataset***REMOVED***
    except Dataset.DoesNotExist:
      self.dataset = None
    try:
      self.variable_1 = Variable.objects.get(dataset__pk=dataset, pk=variable_1***REMOVED***
    except Variable.DoesNotExist:
      self.variable_1 = None
    try:
      self.variable_2 = Variable.objects.get(dataset__pk=dataset, pk=variable_2***REMOVED***
    except Variable.DoesNotExist:
      self.variable_2 = None
    self.data = {'dataset': self.dataset, 'variable_1': self.variable_1, 'variable_2': self.variable_2***REMOVED***

  def is_valid(self***REMOVED***:
    if not isinstance(self.dataset, Dataset***REMOVED***:
      return False
    if not isinstance(self.variable_1, Variable***REMOVED*** and isinstance(self.variable_2, Variable***REMOVED***:
      return False
    return True
