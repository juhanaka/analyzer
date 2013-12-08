from django.db import models
from django.contrib.auth.models import User
from picklefield.fields import PickledObjectField
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save

variable_datatype_choices = [
('string', 'string'***REMOVED***,
('boolean', 'boolean'***REMOVED***,
('integer', 'integer'***REMOVED***,
('float', 'float'***REMOVED***,
('date', 'date'***REMOVED***,
('undefined', 'undefined'***REMOVED***
]

variable_subtype_choices = [
('discrete', 'discrete'***REMOVED***,
('continuous', 'continuous'***REMOVED***
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
  subtype = models.CharField(choices=variable_subtype_choices, max_length=200***REMOVED***
  values = PickledObjectField(***REMOVED***
  def __unicode__(self***REMOVED***:
    return self.dataset.name + ":" + self.name

#automatically create api token for user
@receiver(post_save, sender=User***REMOVED***
def create_auth_token(sender, instance=None, created=False, **kwargs***REMOVED***:
  if created:
    Token.objects.create(user=instance***REMOVED***
