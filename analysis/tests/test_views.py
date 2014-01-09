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
import os

class RegressionTest(TestCase):

  def setUp(self):
    self.client = APIClient()
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest')
    self.url = reverse('analysis:linear_regression')
    self.token = Token.objects.get(user=self.user.id)
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    #create dataset and variables from test file
    this_dir = os.getcwd()
    self.variable_ids = []
    self.dataset = Dataset(name='test_set', owner=self.user)
    self.dataset.save()
    with open(this_dir + '/analysis/tests/test_files/test_data_2.csv') as file_obj:
      file_obj = read_csv(file_obj, sep=',', header=0)
      for column in file_obj:
        (datatype, values) = return_type_and_format_values(file_obj[column])
        values = values if values is not None else file_obj[column]
        datatype = datatype if datatype else 'undefined'
        subtype = return_default_subtype(datatype)
        v = Variable(name=column, dataset=self.dataset, datatype=datatype, subtype=subtype, values=values)
        v.save()
        self.variable_ids.append(v.id)

  def test_regression_wrong_user(self):
    data = {'dataset': self.dataset.id, 'x': self.variable_ids[0], 'y':self.variable_ids[1]}
    self.wrong_client = APIClient()
    self.wrong_user = User.objects.create_user(username='wrong_user', email='test@test.com', password='testtest')
    self.wrong_token = Token.objects.get(user=self.wrong_user.id)
    self.wrong_client.credentials(HTTP_AUTHORIZATION='Token ' + self.wrong_token.key)
    response = self.wrong_client.get(self.url, data)
    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

  def test_regression_basecase(self):
    data = {'dataset': self.dataset.id, 'x': self.variable_ids[0], 'y':self.variable_ids[1]}
    response = self.client.get(self.url, data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertTrue(response.data['slope'])
    self.assertTrue(response.data['intercept'])
    self.assertTrue(response.data['r_squared'])
    self.assertTrue(response.data['p_value'])
    self.assertTrue(response.data['stderr'])

  def test_regression_wrong_datatype(self):
    v = Variable.objects.get(id=self.variable_ids[0])
    v.datatype = 'boolean'
    v.save()
    data = {'dataset': self.dataset.id, 'x': self.variable_ids[0], 'y':self.variable_ids[1]}
    response = self.client.get(self.url, data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response.data['detail'], 'Wrong type variables for regression')
    self.assertEqual(response.data.__len__(), 1)

class OneSampleTTestTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest')
        self.url = reverse('analysis:one_sample_ttest')
        self.token = Token.objects.get(user=self.user.id)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        #create dataset and variables from test file
        this_dir = os.getcwd()
        self.dataset = Dataset(name='test_set', owner=self.user)
        self.dataset.save()
        with open(this_dir + '/analysis/tests/test_files/ttest_test_data.csv') as file_obj:
          file_obj = read_csv(file_obj, sep=',', header=0)
          for column in file_obj:
            (datatype, values) = return_type_and_format_values(file_obj[column])
            values = values if values is not None else file_obj[column]
            datatype = datatype if datatype else 'undefined'
            subtype = return_default_subtype(datatype)
            v = Variable(name=column, dataset=self.dataset, datatype=datatype, subtype=subtype, values=values)
            v.save()
            self.variable_id = v.id
        self.mean = 46

    def test_ttest_wrong_user(self):
        data = {'dataset': self.dataset.id, 'variable': self.variable_id, 'mean': self.mean}
        self.wrong_client = APIClient()
        self.wrong_user = User.objects.create_user(username='wrong_user', email='test@test.com', password='testtest')
        self.wrong_token = Token.objects.get(user=self.wrong_user.id)
        self.wrong_client.credentials(HTTP_AUTHORIZATION='Token ' + self.wrong_token.key)
        response = self.wrong_client.get(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_ttest_basecase(self):
        data = {'dataset': self.dataset.id, 'variable': self.variable_id, 'mean': self.mean}
        response = self.client.get(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['t_value'])
        self.assertTrue(response.data['p_value'])
        self.assertTrue(response.data['interpretation'])
        self.assertTrue(response.data['accept_null'])
        self.assertTrue(response.data['shapiro_result'])

    def test_ttest_wrong_datatype(self):
        v = Variable.objects.get(id=self.variable_id)
        v.datatype = 'boolean'
        v.save()
        data = {'dataset': self.dataset.id, 'variable': self.variable_id, 'mean': self.mean}
        response = self.client.get(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Wrong type variables for t-test')
        self.assertEqual(response.data.__len__(), 1)

class TwoSampleTTestTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest')
        self.url = reverse('analysis:two_sample_ttest')
        self.token = Token.objects.get(user=self.user.id)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        #create dataset and variables from test file
        this_dir = os.getcwd()
        self.dataset = Dataset(name='test_set', owner=self.user)
        self.dataset.save()
        self.variable_ids = []
        with open(this_dir + '/analysis/tests/test_files/two_sample_ttest_data.csv') as file_obj:
          file_obj = read_csv(file_obj, sep=',', header=0)
          for column in file_obj:
            (datatype, values) = return_type_and_format_values(file_obj[column])
            values = values if values is not None else file_obj[column]
            datatype = datatype if datatype else 'undefined'
            subtype = return_default_subtype(datatype)
            v = Variable(name=column, dataset=self.dataset, datatype=datatype, subtype=subtype, values=values)
            v.save()
            self.variable_ids.append(v.id)

    def test_ttest_wrong_user(self):
        data = {'dataset': self.dataset.id, 'variable_1': self.variable_ids[0], 'variable_2': self.variable_ids[1]}
        self.wrong_client = APIClient()
        self.wrong_user = User.objects.create_user(username='wrong_user', email='test@test.com', password='testtest')
        self.wrong_token = Token.objects.get(user=self.wrong_user.id)
        self.wrong_client.credentials(HTTP_AUTHORIZATION='Token ' + self.wrong_token.key)
        response = self.wrong_client.get(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_ttest_basecase(self):
        data = {'dataset': self.dataset.id, 'variable_1': self.variable_ids[0], 'variable_2': self.variable_ids[1]}
        response = self.client.get(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['t_value'])
        self.assertTrue(response.data['p_value'])
        self.assertTrue(response.data['interpretation'])
        self.assertTrue(response.data['accept_null'])
        self.assertTrue(response.data['shapiro_result_1'])
        self.assertTrue(response.data['shapiro_result_2'])

    def test_ttest_wrong_datatype(self):
        v = Variable.objects.get(id=self.variable_ids[0])
        v.datatype = 'boolean'
        v.save()
        data = {'dataset': self.dataset.id, 'variable_1': self.variable_ids[0], 'variable_2':self.variable_ids[1]}
        response = self.client.get(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Wrong type variables for t-test')
        self.assertEqual(response.data.__len__(), 1)