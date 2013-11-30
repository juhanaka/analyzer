from django.db import models
from django.contrib.auth.models import User
from picklefield.fields import PickledObjectField

variable_datatype_choices = [
('string', 'string'***REMOVED***,
('boolean', 'boolean'***REMOVED***,
('integer', 'integer'***REMOVED***,
('float', 'float'***REMOVED***,
('date', 'date'***REMOVED***,
]

#this is a model that holds the variables
class Dataset(models.Model***REMOVED***:
  #metadata
  owner = models.ForeignKey(User, related_name='datasets'***REMOVED***
  name = models.CharField(max_length=200***REMOVED***
  def __unicode__(self***REMOVED***:
    return self.name


class Variable(models.Model***REMOVED***:
  #metadata
  name = models.CharField(max_length=200***REMOVED***
  dataset = models.ForeignKey(Dataset, related_name='variables'***REMOVED***
  datatype = models.CharField(choices=variable_datatype_choices, max_length=200***REMOVED***
  data = PickledObjectField(***REMOVED***
  def __unicode__(self***REMOVED***:
    return self.dataset.name + ":" + self.name


