from api.models import Dataset, Variable
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.authtoken.models import Token
from django.http import Http404
from api.permissions import IsOwnerOrDeny
from libs import regression
from analysis.serializers import LinearRegressionSerializer
from api.serializers import DatasetSerializer, VariableSerializer

#x, y, exclude_index 

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


    