from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Dataset, Variable
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from api.views import DatasetList
from rest_framework.authtoken.models import Token
from django.test import TestCase
from pandas.io.parsers import read_csv
from libs.variable_type import return_type_and_format_values, return_default_subtype
***REMOVED***

class RegressionTest(TestCase***REMOVED***:

  def setUp(self***REMOVED***:
    self.client = APIClient(***REMOVED***
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest'***REMOVED***
    self.url = reverse('analysis:linear_regression'***REMOVED***
    self.token = Token.objects.get(user=self.user.id***REMOVED***
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key***REMOVED***
    #create dataset and variables from test file
    this_dir = os.getcwd(***REMOVED***
    self.variable_ids = []
    self.dataset = Dataset(name='test_set', owner=self.user***REMOVED***
    self.dataset.save(***REMOVED***
    with open(this_dir + '/analysis/tests/test_files/test_data_2.csv'***REMOVED*** as file_obj:
      file_obj = read_csv(file_obj, sep=',', header=0***REMOVED***
      for column in file_obj:
        (datatype, values***REMOVED*** = return_type_and_format_values(file_obj[column]***REMOVED***
        values = values if values is not None else file_obj[column]
        datatype = datatype if datatype else 'undefined'
        subtype = return_default_subtype(datatype***REMOVED***
        v = Variable(name=column, dataset=self.dataset, datatype=datatype, subtype=subtype, values=values***REMOVED***
        v.save(***REMOVED***
        self.variable_ids.append(v.id***REMOVED***

  def test_regression_wrong_user(self***REMOVED***:
    data = {'dataset': self.dataset.id, 'x': self.variable_ids[0], 'y':self.variable_ids[1]***REMOVED***
    self.wrong_client = APIClient(***REMOVED***
    self.wrong_user = User.objects.create_user(username='wrong_user', email='test@test.com', password='testtest'***REMOVED***
    self.wrong_token = Token.objects.get(user=self.wrong_user.id***REMOVED***
    self.wrong_client.credentials(HTTP_AUTHORIZATION='Token ' + self.wrong_token.key***REMOVED***
    response = self.wrong_client.get(self.url, data***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN***REMOVED***

  def test_regression_basecase(self***REMOVED***:
    data = {'dataset': self.dataset.id, 'x': self.variable_ids[0], 'y':self.variable_ids[1]***REMOVED***
    response = self.client.get(self.url, data***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_200_OK***REMOVED***
    self.assertTrue(response.data['slope']***REMOVED***
    self.assertTrue(response.data['intercept']***REMOVED***
    self.assertTrue(response.data['r_squared']***REMOVED***
    self.assertTrue(response.data['p_value']***REMOVED***
    self.assertTrue(response.data['stderr']***REMOVED***

  def test_regression_wrong_datatype(self***REMOVED***:
    v = Variable.objects.get(id=self.variable_ids[0]***REMOVED***
    v.datatype = 'boolean'
    v.save(***REMOVED***
    data = {'dataset': self.dataset.id, 'x': self.variable_ids[0], 'y':self.variable_ids[1]***REMOVED***
    response = self.client.get(self.url, data***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST***REMOVED***
    self.assertEqual(response.data['detail'], 'Wrong type variables for regression'***REMOVED***
    self.assertEqual(response.data.__len__(***REMOVED***, 1***REMOVED***

class OneSampleTTestTest(TestCase***REMOVED***:

    def setUp(self***REMOVED***:
        self.client = APIClient(***REMOVED***
        self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest'***REMOVED***
        self.url = reverse('analysis:one_sample_ttest'***REMOVED***
        self.token = Token.objects.get(user=self.user.id***REMOVED***
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key***REMOVED***
        #create dataset and variables from test file
        this_dir = os.getcwd(***REMOVED***
        self.dataset = Dataset(name='test_set', owner=self.user***REMOVED***
        self.dataset.save(***REMOVED***
        with open(this_dir + '/analysis/tests/test_files/ttest_test_data.csv'***REMOVED*** as file_obj:
          file_obj = read_csv(file_obj, sep=',', header=0***REMOVED***
          for column in file_obj:
            (datatype, values***REMOVED*** = return_type_and_format_values(file_obj[column]***REMOVED***
            values = values if values is not None else file_obj[column]
            datatype = datatype if datatype else 'undefined'
            subtype = return_default_subtype(datatype***REMOVED***
            v = Variable(name=column, dataset=self.dataset, datatype=datatype, subtype=subtype, values=values***REMOVED***
            v.save(***REMOVED***
            self.variable_id = v.id
        self.mean = 46

    def test_ttest_wrong_user(self***REMOVED***:
        data = {'dataset': self.dataset.id, 'variable': self.variable_id, 'mean': self.mean***REMOVED***
        self.wrong_client = APIClient(***REMOVED***
        self.wrong_user = User.objects.create_user(username='wrong_user', email='test@test.com', password='testtest'***REMOVED***
        self.wrong_token = Token.objects.get(user=self.wrong_user.id***REMOVED***
        self.wrong_client.credentials(HTTP_AUTHORIZATION='Token ' + self.wrong_token.key***REMOVED***
        response = self.wrong_client.get(self.url, data***REMOVED***
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN***REMOVED***

    def test_ttest_basecase(self***REMOVED***:
        data = {'dataset': self.dataset.id, 'variable': self.variable_id, 'mean': self.mean***REMOVED***
        response = self.client.get(self.url, data***REMOVED***
        self.assertEqual(response.status_code, status.HTTP_200_OK***REMOVED***
        self.assertTrue(response.data['t_value']***REMOVED***
        self.assertTrue(response.data['p_value']***REMOVED***
        self.assertTrue(response.data['interpretation']***REMOVED***
        self.assertTrue(response.data['accept_null']***REMOVED***
        self.assertTrue(response.data['shapiro_result']***REMOVED***

    def test_ttest_wrong_datatype(self***REMOVED***:
        v = Variable.objects.get(id=self.variable_id***REMOVED***
        v.datatype = 'boolean'
        v.save(***REMOVED***
        data = {'dataset': self.dataset.id, 'variable': self.variable_id, 'mean': self.mean***REMOVED***
        response = self.client.get(self.url, data***REMOVED***
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST***REMOVED***
        self.assertEqual(response.data['detail'], 'Wrong type variables for t-test'***REMOVED***
        self.assertEqual(response.data.__len__(***REMOVED***, 1***REMOVED***

class TwoSampleTTestTest(TestCase***REMOVED***:

    def setUp(self***REMOVED***:
        self.client = APIClient(***REMOVED***
        self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest'***REMOVED***
        self.url = reverse('analysis:two_sample_ttest'***REMOVED***
        self.token = Token.objects.get(user=self.user.id***REMOVED***
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key***REMOVED***
        #create dataset and variables from test file
        this_dir = os.getcwd(***REMOVED***
        self.dataset = Dataset(name='test_set', owner=self.user***REMOVED***
        self.dataset.save(***REMOVED***
        self.variable_ids = []
        with open(this_dir + '/analysis/tests/test_files/two_sample_ttest_data.csv'***REMOVED*** as file_obj:
          file_obj = read_csv(file_obj, sep=',', header=0***REMOVED***
          for column in file_obj:
            (datatype, values***REMOVED*** = return_type_and_format_values(file_obj[column]***REMOVED***
            values = values if values is not None else file_obj[column]
            datatype = datatype if datatype else 'undefined'
            subtype = return_default_subtype(datatype***REMOVED***
            v = Variable(name=column, dataset=self.dataset, datatype=datatype, subtype=subtype, values=values***REMOVED***
            v.save(***REMOVED***
            self.variable_ids.append(v.id***REMOVED***

    def test_ttest_wrong_user(self***REMOVED***:
        data = {'dataset': self.dataset.id, 'variable_1': self.variable_ids[0], 'variable_2': self.variable_ids[1]***REMOVED***
        self.wrong_client = APIClient(***REMOVED***
        self.wrong_user = User.objects.create_user(username='wrong_user', email='test@test.com', password='testtest'***REMOVED***
        self.wrong_token = Token.objects.get(user=self.wrong_user.id***REMOVED***
        self.wrong_client.credentials(HTTP_AUTHORIZATION='Token ' + self.wrong_token.key***REMOVED***
        response = self.wrong_client.get(self.url, data***REMOVED***
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN***REMOVED***

    def test_ttest_basecase(self***REMOVED***:
        data = {'dataset': self.dataset.id, 'variable_1': self.variable_ids[0], 'variable_2': self.variable_ids[1]***REMOVED***
        response = self.client.get(self.url, data***REMOVED***
        self.assertEqual(response.status_code, status.HTTP_200_OK***REMOVED***
        self.assertTrue(response.data['t_value']***REMOVED***
        self.assertTrue(response.data['p_value']***REMOVED***
        self.assertTrue(response.data['interpretation']***REMOVED***
        self.assertTrue(response.data['accept_null']***REMOVED***
        self.assertTrue(response.data['shapiro_result_1']***REMOVED***
        self.assertTrue(response.data['shapiro_result_2']***REMOVED***

    def test_ttest_wrong_datatype(self***REMOVED***:
        v = Variable.objects.get(id=self.variable_ids[0]***REMOVED***
        v.datatype = 'boolean'
        v.save(***REMOVED***
        data = {'dataset': self.dataset.id, 'variable_1': self.variable_ids[0], 'variable_2':self.variable_ids[1]***REMOVED***
        response = self.client.get(self.url, data***REMOVED***
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST***REMOVED***
        self.assertEqual(response.data['detail'], 'Wrong type variables for t-test'***REMOVED***
        self.assertEqual(response.data.__len__(***REMOVED***, 1***REMOVED***