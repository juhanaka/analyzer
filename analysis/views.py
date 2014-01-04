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


class LinearRegression(APIView***REMOVED***:
  authentication_classes = [TokenAuthentication, SessionAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny,***REMOVED***

  def get(self, request, format=None***REMOVED***:
    serializer = LinearRegressionSerializer(request.QUERY_PARAMS***REMOVED***
    if serializer.is_valid(***REMOVED***:
      self.check_object_permissions(request, serializer.data['dataset']***REMOVED***
      if not regression.check_variables(serializer.data['x'], serializer.data['y']***REMOVED***:
        return Response({'detail': 'Wrong type variables for regression'***REMOVED***, 
                status=status.HTTP_400_BAD_REQUEST***REMOVED***
      regression_data = regression.LinearRegressionCalc(x=serializer.data['x'],
                          y=serializer.data['y'], dataset=serializer.data['dataset']***REMOVED***
      return Response(regression_data, status=status.HTTP_200_OK***REMOVED***
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST***REMOVED***

class OneSampleTTest(APIView***REMOVED***:
  authentication_classes = [TokenAuthentication, SessionAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny***REMOVED***

  def get(self, request, format=None***REMOVED***:
    serializer = OneSampleTTestSerializer(request.QUERY_PARAMS***REMOVED***
    if serializer.is_valid(***REMOVED***:
      self.check_object_permissions(request, serializer.data['dataset']***REMOVED***
      if not t_test.one_sample_check_variable(serializer.data['variable']***REMOVED***:
        return Response({'detail': 'Wrong type variables for t-test'***REMOVED***, status=status.HTTP_400_BAD_REQUEST***REMOVED***
      test_data = t_test.one_sample_t_test(variable=serializer.data['variable'], dataset=serializer.data['dataset'], mean=serializer.data['mean']***REMOVED***
      return Response(test_data, status=status.HTTP_200_OK***REMOVED***
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST***REMOVED***

class TwoSampleTTest(APIView***REMOVED***:
  authentication_classes = [TokenAuthentication, SessionAuthentication]
  permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny***REMOVED***

  def get(self, request, format=None***REMOVED***:
    serializer = TwoSampleTTestSerializer(request.QUERY_PARAMS***REMOVED***
    if serializer.is_valid(***REMOVED***:
      self.check_object_permissions(request, serializer.data['dataset']***REMOVED***
      if not (t_test.one_sample_check_variable(serializer.data['variable_1']***REMOVED*** and t_test.one_sample_check_variable(serializer.data['variable_2']***REMOVED******REMOVED***:
        return Response({'detail': 'Wrong type variables for t-test'***REMOVED***, status=status.HTTP_400_BAD_REQUEST***REMOVED***
      test_data = t_test.two_sample_t_test(variable_1=serializer.data['variable_1'], variable_2=serializer.data['variable_2'],
        dataset=serializer.data['dataset']***REMOVED***
      return Response(test_data, status=status.HTTP_200_OK***REMOVED***
    else:
      return Response(status=status.HTTP_400_BAD_REQUEST***REMOVED***


