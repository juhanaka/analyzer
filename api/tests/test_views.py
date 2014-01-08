from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Dataset, Variable
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from api.views import DatasetList
from rest_framework.authtoken.models import Token
from django.test import TestCase
import os

#Test creation of datasets.
class GetAPITokenTest(TestCase):

  def setUp(self):
    self.client = APIClient()
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest')
    self.url = reverse('api:get_api_token')

  def test_get_api_token(self):
    self.client.login(username='api_test_user', password='testtest')
    response = self.client.get(self.url)
    token = Token.objects.get(user=self.user.id)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['token'], token.key)
    self.client.logout()

  def test_post_api_token(self):
    self.client.login(username='api_test_user', password='testtest')
    response = self.client.post(self.url)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

  def test_put_api_token(self):
    self.client.login(username='api_test_user', password='testtest')
    response = self.client.put(self.url)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

  def test_delete_api_token(self):
    self.client.login(username='api_test_user', password='testtest')
    response = self.client.delete(self.url)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class DatasetCreateTest(TestCase):

  def setUp(self):
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest')
    self.token = Token.objects.get(user=self.user.id)
    self.client = APIClient()
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    self.url = reverse('api:dataset_list')

  def test_create_dataset(self):
    correct_variable_names = ('string', 'integer', 'float', 'boolean', 'date')
    #send a post request with test csv file
    this_dir = os.getcwd()
    with open(this_dir + '/api/tests/test_files/analyzer_test.csv') as test_file:
      data = {'name': 'test_set', 'file': test_file}
      response = self.client.post(self.url, data)
    #check to see that all fields of the created dataset are correct
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(response.data['name'], u'test_set')
    self.assertEqual(response.data['owner'], u'api_test_user')
    self.assertEqual(response.data['variables'].__len__(), correct_variable_names.__len__())

  #create a dataset with just name and no file. The dataset should be created.
  def test_create_dataset_nofile(self):
    data = {'name': 'test_set'}
    response = self.client.post(self.url, data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(response.data['name'], u'test_set')
    self.assertEqual(response.data['owner'], u'api_test_user')

  #create a dataset without a name. this should fail.
  def test_create_dataset_noname(self):
    this_dir = os.getcwd()
    with open(this_dir + '/api/tests/test_files/analyzer_test.csv') as test_file:
      data = {'file': test_file}
      response = self.client.post(self.url, data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

  #Clear credentials and test creating a dataset without an api token. Should return a 401 status.
  def test_create_dataset_noauth(self):
    self.client.credentials()
    data = {'name': 'test_set_2'}
    response = self.client.post(self.url, data)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#test the get functionality of the DatasetList view.
class DatasetListTest(TestCase):
  #create two users and one dataset for each user.
  def setUp(self):
    self.user1 = User.objects.create_user(username='api_test_user_1', email='test@test.com', password='testtest')
    self.user2 = User.objects.create_user(username='api_test_user_2', email='test@test.com', password='testtest')
    self.token1 = Token.objects.get(user=self.user1.id)
    self.token2 = Token.objects.get(user=self.user2.id)
    self.client = APIClient()
    self.url = reverse('api:dataset_list')
    self.dataset1 = Dataset(name='dataset1', owner=self.user1)
    self.dataset1.save()
    self.dataset2 = Dataset(name='dataset2', owner=self.user2)
    self.dataset2.save()

  #Test that each user is shown only the dataset that he owns.
  def test_show_datasets_by_owner(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)
    response = self.client.get(self.url)
    self.assertEqual(response.data.__len__(), 1)
    self.assertEqual(response.data[0]['name'], u'dataset1')
    self.assertEqual(response.data[0]['owner'], u'api_test_user_1')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  #Test that unauthorized gets result in a 401 status code.
  def test_list_dataset_noauth(self):
    self.client.credentials()
    response = self.client.get(self.url)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class GetOrModifyOrDeleteDatasetTest(TestCase):

  def setUp(self):
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest')
    self.token = Token.objects.get(user=self.user.id)
    self.user2 = User.objects.create_user(username='dummyuser', email='test@test.com', password='testtest')
    self.client = APIClient()
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    self.dataset = Dataset(name='test_set', owner=self.user)
    self.dataset.save()
    self.dataset2 = Dataset(name='test_set_2', owner=self.user2)
    self.dataset2.save()
    self.url = reverse('api:dataset_detail', kwargs={'pk': self.dataset.id})
    self.url2 = reverse('api:dataset_detail', kwargs={'pk': self.dataset2.id})

  def test_modify_dataset(self):
    correct_variable_names = ('string', 'integer', 'float', 'boolean', 'date')
    this_dir = os.getcwd()
    with open(this_dir + '/api/tests/test_files/analyzer_test.csv') as test_file:
      data = {'name': 'changed_name', 'file': test_file}
      response = self.client.put(self.url, data)
    #check to see that all fields of the created dataset are correct
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['name'], u'changed_name')
    self.assertEqual(response.data['owner'], u'api_test_user')
    self.assertEqual(response.data['variables'].__len__(), correct_variable_names.__len__())

  def test_get_dataset(self):
    response1 = self.client.get(self.url)
    response2 = self.client.get(self.url2)
    self.assertEqual(response1.status_code, status.HTTP_200_OK)
    self.assertEqual(response2.status_code, status.HTTP_403_FORBIDDEN)
    self.assertEqual(response1.data['name'], u'test_set')
    self.assertEqual(response1.data['owner'], u'api_test_user')

  def test_delete_dataset(self):
    response = self.client.delete(self.url)
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class GetVariableList(TestCase):

  def setUp(self):
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest')
    self.token = Token.objects.get(user=self.user.id)
    self.client = APIClient()
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    self.dataset = Dataset(name='test_set', owner=self.user)
    self.dataset.save()
    self.url = reverse('api:variable_by_dataset_list', kwargs={'dataset_pk': self.dataset.id})
    self.variable1 = Variable(name='variable1', dataset=self.dataset, datatype='string', values=['one', 'two', 'three'])
    self.variable1.save()
    self.variable2 = Variable(name='variable2', dataset=self.dataset, datatype='integer', values=[1, 2, 3])
    self.variable2.save()

  def test_get_variable_list(self):
    response = self.client.get(self.url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data.__len__(), 2)

class GetVariableDetail(TestCase):

  def setUp(self):
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest')
    self.token = Token.objects.get(user=self.user.id)
    self.client = APIClient()
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    self.dataset = Dataset(name='test_set', owner=self.user)
    self.dataset.save()
    self.variable = Variable(name='variable', dataset=self.dataset, datatype='string', values=['one', 'two', 'three'])
    self.variable.save()
    self.url = reverse('api:variable_by_dataset_detail', kwargs={'dataset_pk': self.dataset.id, 'pk':self.variable.id})
    
  def test_get_variable_detail(self):
    response = self.client.get(self.url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['name'], self.variable.name)
    self.assertEqual(response.data['dataset'], self.variable.dataset.id)
    self.assertEqual(response.data['datatype'], self.variable.datatype)
    self.assertEqual(response.data['values'], self.variable.values)

  def test_modify_variable(self):
    data = {'name': 'changed_name', 'dataset':'changed_dataset', 'datatype':'float', 'subtype': 'continuous', 'values':[1, 2 , 3]}
    response = self.client.put(self.url, data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['name'], data['name'])
    self.assertEqual(response.data['dataset'], self.variable.dataset.id)
    self.assertEqual(response.data['datatype'], self.variable.datatype)
    self.assertEqual(response.data['values'], self.variable.values)
    self.assertEqual(response.data['subtype'], data['subtype'])

  def test_delete_variable(self):
    response = self.client.delete(self.url)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
