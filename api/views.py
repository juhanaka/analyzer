from api.models import Dataset, Variable
from api.serializers import DatasetSerializer, VariableSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from api.permissions import IsOwnerOrDeny
from pandas.io.parsers import read_csv
from libs.variable_type import return_type_and_format_values, return_default_subtype
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from django.http import Http404
from rest_framework.authtoken.models import Token

class DatasetList(APIView***REMOVED***:
  authentication_classes = [TokenAuthentication, SessionAuthentication,]
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
          (datatype, values***REMOVED*** = return_type_and_format_values(file_obj[column]***REMOVED***
          values = values if values is not None else file_obj[column]
          datatype = datatype if datatype else 'undefined'
          subtype = return_default_subtype(datatype***REMOVED***
          v = Variable(name=column, dataset=serializer.object, datatype=datatype, subtype=subtype, values=values***REMOVED***
          v.save(***REMOVED***

      else:
        serializer.save(***REMOVED***
      return Response(serializer.data, status=status.HTTP_201_CREATED***REMOVED***
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST***REMOVED***

class DatasetDetail(APIView***REMOVED***:
  authentication_classes = [TokenAuthentication, SessionAuthentication,]
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
          subtype = return_default_subtype(datatype***REMOVED***
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

class VariableByDatasetList(generics.ListAPIView***REMOVED***:
  model = Variable
  serializer_class = VariableSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly,***REMOVED***

  def get_queryset(self***REMOVED***:
    dataset_pk = self.kwargs.get('dataset_pk', None***REMOVED***
    if dataset_pk is not None:
      return Variable.objects.filter(dataset__pk=dataset_pk***REMOVED***
    return []

class VariableByDatasetDetail(APIView***REMOVED***:
  permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrDeny***REMOVED***
  authentication_classes = [TokenAuthentication, SessionAuthentication]

  def get_object(self, dataset_pk, pk***REMOVED***:
    try:
      queryset = Variable.objects.filter(dataset__pk=dataset_pk***REMOVED***
      obj = queryset.get(pk=pk***REMOVED***
    except Variable.DoesNotExist:
      raise Http404
    self.check_object_permissions(self.request, obj***REMOVED***
    return obj

  def get(self, request, dataset_pk, pk, format=None***REMOVED***:
    variable = self.get_object(dataset_pk, pk***REMOVED***
    serializer = VariableSerializer(variable***REMOVED***
    return Response(serializer.data***REMOVED***

  def put(self, request, dataset_pk, pk, format=None***REMOVED***:
    variable = self.get_object(dataset_pk, pk***REMOVED***
    serializer = VariableSerializer(variable, data=request.DATA***REMOVED***
    if serializer.is_valid(***REMOVED***:
      serializer.save(***REMOVED***
      return Response(serializer.data, status=status.HTTP_200_OK***REMOVED***
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST***REMOVED***

  def delete(self, request, dataset_pk, pk, format=None***REMOVED***:
    return Response(status=status.HTTP_400_BAD_REQUEST***REMOVED***

class GetAPIToken(APIView***REMOVED***:
  authentication_classes = [TokenAuthentication, SessionAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny,***REMOVED***
  def get(self, request, format=None***REMOVED***:
    user = User.objects.get(username=request.user.username***REMOVED***
    token = Token.objects.get(user=user.id***REMOVED***
    return Response({'token':token.key***REMOVED******REMOVED***
  def post(self, request, format=None***REMOVED***:
    return Response(status=status.HTTP_401_UNAUTHORIZED***REMOVED***
  def put(self, request, format=None***REMOVED***:
    return Response(status=status.HTTP_401_UNAUTHORIZED***REMOVED***
  def delete(self, request, format=None***REMOVED***:
    return Response(status=status.HTTP_401_UNAUTHORIZED***REMOVED***