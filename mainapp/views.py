from mainapp.models import Dataset, Variable
from mainapp.serializers import DatasetSerializer, VariableSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from mainapp.permissions import IsOwnerOrDeny

class DatasetList(generics.ListCreateAPIView***REMOVED***:
  queryset = Dataset.objects.all(***REMOVED***
  serializer_class = DatasetSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrDeny,***REMOVED***
  def pre_save(self, obj***REMOVED***:
    obj.owner = self.request.user

class DatasetDetail(generics.RetrieveUpdateDestroyAPIView***REMOVED***:
  queryset = Dataset.objects.all(***REMOVED***
  serializer_class = DatasetSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrDeny,***REMOVED***
  def pre_save(self, obj***REMOVED***:
    obj.owner = self.request.user

class UserList(generics.ListAPIView***REMOVED***:
  queryset = User.objects.all(***REMOVED***
  serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView***REMOVED***:
  queryset = User.objects.all(***REMOVED***
  serializer_class = UserSerializer

class VariableByDatasetList(generics.ListCreateAPIView***REMOVED***:
  model = Variable
  serializer_class = VariableSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly,***REMOVED***
  def get_queryset(self***REMOVED***:
    dataset_pk = self.kwargs.get('dataset_pk', None***REMOVED***
    if dataset_pk is not None:
      return Variable.objects.filter(dataset__pk=dataset_pk***REMOVED***
    return []

class VariableByDatasetDetail(generics.RetrieveUpdateDestroyAPIView***REMOVED***:
  model = Variable
  serializer_class = VariableSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly,***REMOVED***
  def get_queryset(self***REMOVED***:
    dataset_pk = self.kwargs.get('dataset_pk', None***REMOVED***
    if dataset_pk is not None:
      return Variable.objects.filter(dataset__pk=dataset_pk***REMOVED***
    return []



