from django.db import models

class Dataset(models.Model***REMOVED***:
  name = models.CharField(max_length=200***REMOVED***
  def __unicode__(self***REMOVED***:
    return self.name

class Variable(models.Model***REMOVED***:
  name = models.CharField(max_length=200***REMOVED***
  dataset = models.ForeignKey(Dataset***REMOVED***
  def __unicode__(self***REMOVED***:
    return self.dataset.name + ":" + self.name
