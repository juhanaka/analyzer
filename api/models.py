from django.db import models
from django.contrib.auth.models import User
from picklefield.fields import PickledObjectField
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save

variable_datatype_choices = [
('string', 'string'),
('boolean', 'boolean'),
('integer', 'integer'),
('float', 'float'),
('date', 'date'),
('undefined', 'undefined')
]

variable_subtype_choices = [
('discrete', 'discrete'),
('continuous', 'continuous')
]

#this is a model that holds the variables
class Dataset(models.Model):
  #metadata
  owner = models.ForeignKey(User, related_name='datasets')
  name = models.CharField(max_length=200)
  def __unicode__(self):
    return self.name

class Variable(models.Model):
  #metadata
  name = models.CharField(max_length=200)
  dataset = models.ForeignKey(Dataset, related_name='variables')
  datatype = models.CharField(choices=variable_datatype_choices, max_length=200)
  subtype = models.CharField(choices=variable_subtype_choices, max_length=200)
  values = PickledObjectField()
  def __unicode__(self):
    return self.dataset.name + ":" + self.name

#automatically create api token for user
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  if created:
    Token.objects.create(user=instance)
