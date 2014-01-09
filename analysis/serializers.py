from rest_framework import serializers
from api.serializers import ArrayField
from api.models import Variable, Dataset
from django.http import Http404
import json
import ast
import numpy as np

#This serializer deserializes the parameters, and fetches the right dataset and variables based on their
#primary keys.
class LinearRegressionSerializer():
  def __init__(self, data):
    dataset = data.get('dataset', None)
    x = data.get('x', None)
    y = data.get('y', None)

    dataset = dataset.encode('utf-8') if dataset else None
    x = x.encode('utf-8') if x else None
    y = y.encode('utf-8') if y else None

    try:
      self.dataset = Dataset.objects.get(id=dataset)
    except Dataset.DoesNotExist:
      self.dataset = None
    try:
      self.x = Variable.objects.get(dataset__pk=dataset, pk=x)
    except Variable.DoesNotExist:
      self.x = None
    try:
      self.y = Variable.objects.get(dataset__pk=dataset, pk=y)
    except Variable.DoesNotExist:
      self.y = None
    self.data = {'x':self.x, 'y': self.y, 'dataset': self.dataset}

  #The is_valid method checks that both variables and the dataset have been found.
  def is_valid(self):
    if not isinstance(self.dataset, Dataset):
      return False
    elif not (isinstance(self.x, Variable) and isinstance(self.y, Variable)):
      return False
    return True

#This serializer deserializes the parameters, and fetches the right dataset and variable.
class OneSampleTTestSerializer():
  def __init__(self, data):
    dataset = data.get('dataset', None)
    variable = data.get('variable',None)
    mean = data.get('mean', None)
    dataset = dataset.encode('utf-8') if dataset else None
    variable = variable.encode('utf-8') if variable else None
    self.mean = np.float64(mean.encode('utf-8')) if mean else None

    try:
      self.dataset = Dataset.objects.get(id=dataset)
    except Dataset.DoesNotExist:
      self.dataset = None
    try:
      self.variable = Variable.objects.get(dataset__pk=dataset, pk=variable)
    except Variable.DoesNotExist:
      self.variable = None

    self.data = {'dataset': self.dataset, 'variable': self.variable, 'mean': self.mean}

  #Test that the dataset, variable and mean are valid.
  def is_valid(self):
    if not isinstance(self.dataset, Dataset):
      return False
    if not isinstance(self.variable, Variable):
      return False
    if not self.mean:
      return False
    return True

#Deserialize parameters, fetch the right variables and dataset.
class TwoSampleTTestSerializer():
  def __init__(self, data):
    dataset = data.get('dataset', None)
    variable_1 = data.get('variable_1',None)
    variable_2 = data.get('variable_2',None)
    dataset = dataset.encode('utf-8') if dataset else None
    variable_1 = variable_1.encode('utf-8') if variable_1 else None
    variable_2 = variable_2.encode('utf-8') if variable_2 else None

    try:
      self.dataset = Dataset.objects.get(id=dataset)
    except Dataset.DoesNotExist:
      self.dataset = None
    try:
      self.variable_1 = Variable.objects.get(dataset__pk=dataset, pk=variable_1)
    except Variable.DoesNotExist:
      self.variable_1 = None
    try:
      self.variable_2 = Variable.objects.get(dataset__pk=dataset, pk=variable_2)
    except Variable.DoesNotExist:
      self.variable_2 = None
    self.data = {'dataset': self.dataset, 'variable_1': self.variable_1, 'variable_2': self.variable_2}

  #Check that the dataset and variables have been found.
  def is_valid(self):
    if not isinstance(self.dataset, Dataset):
      return False
    if not isinstance(self.variable_1, Variable) and isinstance(self.variable_2, Variable):
      return False
    return True
