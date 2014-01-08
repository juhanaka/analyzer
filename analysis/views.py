from api.models import Dataset, Variable
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.authtoken.models import Token
from django.http import Http404
from api.permissions import IsOwnerOrDeny
from libs import regression, t_test
from analysis.serializers import LinearRegressionSerializer, OneSampleTTestSerializer, TwoSampleTTestSerializer
from api.serializers import DatasetSerializer, VariableSerializer


class LinearRegression(APIView):
  authentication_classes = [TokenAuthentication, SessionAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny,)

  def get(self, request, format=None):
    serializer = LinearRegressionSerializer(request.QUERY_PARAMS)
    if serializer.is_valid():
      self.check_object_permissions(request, serializer.data['dataset'])
      if not regression.check_variables(serializer.data['x'], serializer.data['y']):
        return Response({'detail': 'Wrong type variables for regression'}, 
                status=status.HTTP_400_BAD_REQUEST)
      regression_data = regression.LinearRegressionCalc(x=serializer.data['x'],
                          y=serializer.data['y'], dataset=serializer.data['dataset'])
      return Response(regression_data, status=status.HTTP_200_OK)
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST)

class OneSampleTTest(APIView):
  authentication_classes = [TokenAuthentication, SessionAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny)

  def get(self, request, format=None):
    serializer = OneSampleTTestSerializer(request.QUERY_PARAMS)
    if serializer.is_valid():
      self.check_object_permissions(request, serializer.data['dataset'])
      if not t_test.one_sample_check_variable(serializer.data['variable']):
        return Response({'detail': 'Wrong type variables for t-test'}, status=status.HTTP_400_BAD_REQUEST)
      test_data = t_test.one_sample_t_test(variable=serializer.data['variable'], dataset=serializer.data['dataset'], mean=serializer.data['mean'])
      return Response(test_data, status=status.HTTP_200_OK)
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST)

class TwoSampleTTest(APIView):
  authentication_classes = [TokenAuthentication, SessionAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny)

  def get(self, request, format=None):
    serializer = TwoSampleTTestSerializer(request.QUERY_PARAMS)
    if serializer.is_valid():
      self.check_object_permissions(request, serializer.data['dataset'])
      if not (t_test.one_sample_check_variable(serializer.data['variable_1']) and t_test.one_sample_check_variable(serializer.data['variable_2'])):
        return Response({'detail': 'Wrong type variables for t-test'}, status=status.HTTP_400_BAD_REQUEST)
      test_data = t_test.two_sample_t_test(variable_1=serializer.data['variable_1'], variable_2=serializer.data['variable_2'],
        dataset=serializer.data['dataset'])
      return Response(test_data, status=status.HTTP_200_OK)
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST)


