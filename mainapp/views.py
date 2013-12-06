from mainapp.models import Dataset, Variable
from mainapp.serializers import DatasetSerializer, VariableSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from mainapp.permissions import IsOwnerOrDeny
from pandas.io.parsers import read_csv
from libs.variable_type import return_type_and_format_values
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from django.http import Http404


class DatasetList(APIView***REMOVED***:
  authentication_classes = [TokenAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny,***REMOVED***

  def get(self, request, format=None***REMOVED***:
    datasets = Dataset.objects.filter(owner=request.user***REMOVED***
    serializer = DatasetSerializer(datasets, many=True***REMOVED***
    return Response(serializer.data***REMOVED***

  def post(self, request, format=None***REMOVED***:
    serializer = DatasetSerializer(data=request.DATA***REMOVED***
    if serializer.is_valid(***REMOVED***:
      serializer.object.owner = User.objects.get(username=request.user.username***REMOVED***
      if request.FILES:
        file_obj = request.FILES['file']
        file_obj = read_csv(file_obj, sep=',', header=0***REMOVED***
        serializer.save(***REMOVED***
        for column in file_obj:
          #todo: make this detect the datatype instead of saving everything as string.
          (datatype, values***REMOVED*** = return_type_and_format_values(file_obj[column]***REMOVED***
          values = values if values is not None else file_obj[column]
          datatype = datatype if datatype else 'undefined'
          v = Variable(name=column, dataset=serializer.object, datatype=datatype, values=values***REMOVED***
          v.save(***REMOVED***
      else:
        serializer.save(***REMOVED***
      return Response(serializer.data, status=status.HTTP_201_CREATED***REMOVED***
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST***REMOVED***

class DatasetDetail(APIView***REMOVED***:
  authentication_classes = [TokenAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny,***REMOVED***

  def get_object(self, pk***REMOVED***:
    try:
      obj = Dataset.objects.get(pk=pk***REMOVED***
    except Dataset.DoesNotExist:
      raise Http404
    self.check_object_permissions(self.request, obj***REMOVED***
    return obj

  def get(self, request, pk, format=None***REMOVED***:
    dataset = self.get_object(pk***REMOVED***
    serializer = DatasetSerializer(dataset***REMOVED***
    return Response(serializer.data***REMOVED***

  def put(self, request, pk, format=None***REMOVED***:
    dataset = self.get_object(pk***REMOVED***
    serializer = DatasetSerializer(dataset, data=request.DATA***REMOVED***
    if serializer.is_valid(***REMOVED***:
      serializer.object.owner = User.objects.get(username=request.user.username***REMOVED***
      if request.FILES:
        file_obj = request.FILES['file']
        file_obj = read_csv(file_obj, sep=',', header=0***REMOVED***
        serializer.save(***REMOVED***
        Variable.objects.filter(dataset=dataset***REMOVED***.delete(***REMOVED***
        for column in file_obj:
          #todo: make this detect the datatype instead of saving everything as string.
          (datatype, values***REMOVED*** = return_type_and_format_values(file_obj[column]***REMOVED***
          values = values if values is not None else file_obj[column]
          datatype = datatype if datatype else 'undefined'
          v = Variable(name=column, dataset=serializer.object, datatype=datatype, values=values***REMOVED***
          v.save(***REMOVED***
      else:
        serializer.save(***REMOVED***
      return Response(serializer.data, status=status.HTTP_200_OK***REMOVED***
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST***REMOVED***

  def delete(self, request, pk, format=None***REMOVED***:
    dataset = self.get_object(pk***REMOVED***
    dataset.delete(***REMOVED***
    return Response(status=status.HTTP_204_NO_CONTENT***REMOVED***

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