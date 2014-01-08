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

class DatasetList(APIView):
  authentication_classes = [TokenAuthentication, SessionAuthentication,]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny,)

  def get(self, request, format=None):
    datasets = Dataset.objects.filter(owner=request.user)
    serializer = DatasetSerializer(datasets, many=True)
    return Response(serializer.data)

  def post(self, request, format=None):
    serializer = DatasetSerializer(data=request.DATA)

    if serializer.is_valid():
      serializer.object.owner = User.objects.get(username=request.user.username)
      if request.FILES:
        file_obj = request.FILES['file']
        file_obj = read_csv(file_obj, sep=',', header=0)
        serializer.save()

        for column in file_obj:
          (datatype, values) = return_type_and_format_values(file_obj[column])
          values = values if values is not None else file_obj[column]
          datatype = datatype if datatype else 'undefined'
          subtype = return_default_subtype(datatype)
          v = Variable(name=column, dataset=serializer.object, datatype=datatype, subtype=subtype, values=values)
          v.save()

      else:
        serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST)

class DatasetDetail(APIView):
  authentication_classes = [TokenAuthentication, SessionAuthentication,]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny,)

  def get_object(self, pk):
    try:
      obj = Dataset.objects.get(pk=pk)
    except Dataset.DoesNotExist:
      raise Http404
    self.check_object_permissions(self.request, obj)
    return obj

  def get(self, request, pk, format=None):
    dataset = self.get_object(pk)
    serializer = DatasetSerializer(dataset)
    return Response(serializer.data)

  def put(self, request, pk, format=None):
    dataset = self.get_object(pk)
    serializer = DatasetSerializer(dataset, data=request.DATA)
    if serializer.is_valid():
      serializer.object.owner = User.objects.get(username=request.user.username)
      if request.FILES:
        file_obj = request.FILES['file']
        file_obj = read_csv(file_obj, sep=',', header=0)
        serializer.save()
        Variable.objects.filter(dataset=dataset).delete()
        for column in file_obj:
          #todo: make this detect the datatype instead of saving everything as string.
          (datatype, values) = return_type_and_format_values(file_obj[column])
          values = values if values is not None else file_obj[column]
          datatype = datatype if datatype else 'undefined'
          subtype = return_default_subtype(datatype)
          v = Variable(name=column, dataset=serializer.object, datatype=datatype, values=values)
          v.save()
      else:
        serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, format=None):
    dataset = self.get_object(pk)
    dataset.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class UserList(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class VariableByDatasetList(generics.ListAPIView):
  model = Variable
  serializer_class = VariableSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

  def get_queryset(self):
    dataset_pk = self.kwargs.get('dataset_pk', None)
    if dataset_pk is not None:
      return Variable.objects.filter(dataset__pk=dataset_pk)
    return []

class VariableByDatasetDetail(APIView):
  permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrDeny)
  authentication_classes = [TokenAuthentication, SessionAuthentication]

  def get_object(self, dataset_pk, pk):
    try:
      queryset = Variable.objects.filter(dataset__pk=dataset_pk)
      obj = queryset.get(pk=pk)
    except Variable.DoesNotExist:
      raise Http404
    self.check_object_permissions(self.request, obj)
    return obj

  def get(self, request, dataset_pk, pk, format=None):
    variable = self.get_object(dataset_pk, pk)
    serializer = VariableSerializer(variable)
    return Response(serializer.data)

  def put(self, request, dataset_pk, pk, format=None):
    variable = self.get_object(dataset_pk, pk)
    serializer = VariableSerializer(variable, data=request.DATA)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, dataset_pk, pk, format=None):
    return Response(status=status.HTTP_400_BAD_REQUEST)

class GetAPIToken(APIView):
  authentication_classes = [TokenAuthentication, SessionAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny,)
  def get(self, request, format=None):
    user = User.objects.get(username=request.user.username)
    token = Token.objects.get(user=user.id)
    return Response({'token':token.key})
  def post(self, request, format=None):
    return Response(status=status.HTTP_401_UNAUTHORIZED)
  def put(self, request, format=None):
    return Response(status=status.HTTP_401_UNAUTHORIZED)
  def delete(self, request, format=None):
    return Response(status=status.HTTP_401_UNAUTHORIZED)