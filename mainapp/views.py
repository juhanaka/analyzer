from mainapp.models import Dataset, Variable
from mainapp.serializers import DatasetSerializer, VariableSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from mainapp.permissions import IsOwnerOrDeny
from pandas.io.parsers import read_csv
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser

from rest_framework.views import APIView

class DatasetList(APIView***REMOVED***:
  def get(self, request, format=None***REMOVED***:
    datasets = Dataset.objects.all(***REMOVED***
    serializer = DatasetSerializer(datasets, many=True***REMOVED***
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrDeny,***REMOVED***
    return Response(serializer.data***REMOVED***
  def post(self, request, format=None***REMOVED***:
    serializer = DatasetSerializer(data=request.DATA***REMOVED***

    if serializer.is_valid(***REMOVED***:
      serializer.object.owner = User.objects.get(username=request.user.username***REMOVED***
      if request.FILES['file']:
        file_obj = request.FILES['file']
        file_obj = read_csv(file_obj, sep=';', header=0***REMOVED***
        serializer.save(***REMOVED***
        for column in file_obj:
          v = Variable(name=column, dataset=serializer.object, datatype='string', data=file_obj[column]***REMOVED***
          v.save(***REMOVED***
      else:
        serializer.save(***REMOVED***


    return Response(request.DATA***REMOVED***

# class DatasetList(generics.ListCreateAPIView***REMOVED***:
#   queryset = Dataset.objects.all(***REMOVED***
#   serializer_class = DatasetSerializer
#   permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrDeny,***REMOVED***
#   def post(self, request***REMOVED***:
#     if request.FILES:
#       file_obj = request.FILES['file']
#       print dir(file_obj***REMOVED***
#     return Response(self.request.data***REMOVED***
#   def pre_save(self, obj***REMOVED***:
#     obj.owner = self.request.user

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



