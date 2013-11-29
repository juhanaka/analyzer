from django.db import models
from django.contrib.auth.models import User

class Dataset(models.Model***REMOVED***:
  owner = models.ForeignKey(User, related_name='datasets'***REMOVED***
  name = models.CharField(max_length=200***REMOVED***
  def __unicode__(self***REMOVED***:
    return self.name

class Variable(models.Model***REMOVED***:
  name = models.CharField(max_length=200***REMOVED***
  dataset = models.ForeignKey(Dataset, related_name='variables'***REMOVED***
  def __unicode__(self***REMOVED***:
    return self.dataset.name + ":" + self.name
