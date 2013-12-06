from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status
from mainapp.models import Dataset, Variable
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from mainapp.views import DatasetList
from rest_framework.authtoken.models import Token
from django.test import TestCase
***REMOVED***

#Test creation of datasets.
class DatasetCreateTest(TestCase***REMOVED***:

  def setUp(self***REMOVED***:
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest'***REMOVED***
    self.token = Token.objects.get(user=self.user.id***REMOVED***
    self.client = APIClient(***REMOVED***
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key***REMOVED***
    self.url = reverse('mainapp:dataset_list'***REMOVED***

  def test_create_dataset(self***REMOVED***:
    correct_variable_names = ('string', 'integer', 'float', 'boolean', 'date'***REMOVED***
    #send a post request with test csv file
    this_dir = os.getcwd(***REMOVED***
    with open(this_dir + '/mainapp/tests/test_files/analyzer_test.csv'***REMOVED*** as test_file:
      data = {'name': 'test_set', 'file': test_file***REMOVED***
      response = self.client.post(self.url, data***REMOVED***
    #check to see that all fields of the created dataset are correct
    self.assertEqual(response.status_code, status.HTTP_201_CREATED***REMOVED***
    self.assertEqual(response.data['name'], u'test_set'***REMOVED***
    self.assertEqual(response.data['owner'], u'api_test_user'***REMOVED***
    self.assertEqual(response.data['variables'].__len__(***REMOVED***, correct_variable_names.__len__(***REMOVED******REMOVED***
    #check to see that all variables, that were column headers in csv file, have been created
    #and are assigned to correct dataset and have the correct amount of data
    for name in correct_variable_names:
      variable = Variable.objects.get(name=name***REMOVED***
      self.assertEqual(variable.dataset.name, 'test_set'***REMOVED***
      self.assertEqual(variable.values.__len__(***REMOVED***, 20***REMOVED***
      self.assertEqual(variable.datatype, name***REMOVED***

  #create a dataset with just name and no file. The dataset should be created.
  def test_create_dataset_nofile(self***REMOVED***:
    data = {'name': 'test_set'***REMOVED***
    response = self.client.post(self.url, data***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_201_CREATED***REMOVED***
    self.assertEqual(response.data['name'], u'test_set'***REMOVED***
    self.assertEqual(response.data['owner'], u'api_test_user'***REMOVED***

  #create a dataset without a name. this should fail.
  def test_create_dataset_noname(self***REMOVED***:
    this_dir = os.getcwd(***REMOVED***
    with open(this_dir + '/mainapp/tests/test_files/analyzer_test.csv'***REMOVED*** as test_file:
      data = {'file': test_file***REMOVED***
      response = self.client.post(self.url, data***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST***REMOVED***

  #Clear credentials and test creating a dataset without an api token. Should return a 401 status.
  def test_create_dataset_noauth(self***REMOVED***:
    self.client.credentials(***REMOVED***
    data = {'name': 'test_set_2'***REMOVED***
    response = self.client.post(self.url, data***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED***REMOVED***

#test the get functionality of the DatasetList view.
class DatasetListTest(TestCase***REMOVED***:
  #create two users and one dataset for each user.
  def setUp(self***REMOVED***:
    self.user1 = User.objects.create_user(username='api_test_user_1', email='test@test.com', password='testtest'***REMOVED***
    self.user2 = User.objects.create_user(username='api_test_user_2', email='test@test.com', password='testtest'***REMOVED***
    self.token1 = Token.objects.get(user=self.user1.id***REMOVED***
    self.token2 = Token.objects.get(user=self.user2.id***REMOVED***
    self.client = APIClient(***REMOVED***
    self.url = reverse('mainapp:dataset_list'***REMOVED***
    self.dataset1 = Dataset(name='dataset1', owner=self.user1***REMOVED***
    self.dataset1.save(***REMOVED***
    self.dataset2 = Dataset(name='dataset2', owner=self.user2***REMOVED***
    self.dataset2.save(***REMOVED***

  #Test that each user is shown only the dataset that he owns.
  def test_show_datasets_by_owner(self***REMOVED***:
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key***REMOVED***
    response = self.client.get(self.url***REMOVED***
    self.assertEqual(response.data.__len__(***REMOVED***, 1***REMOVED***
    self.assertEqual(response.data[0]['name'], u'dataset1'***REMOVED***
    self.assertEqual(response.data[0]['owner'], u'api_test_user_1'***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_200_OK***REMOVED***

  #Test that unauthorized gets result in a 401 status code.
  def test_list_dataset_noauth(self***REMOVED***:
    self.client.credentials(***REMOVED***
    response = self.client.get(self.url***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED***REMOVED***

class GetOrModifyOrDeleteDatasetTest(TestCase***REMOVED***:

  def setUp(self***REMOVED***:
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest'***REMOVED***
    self.token = Token.objects.get(user=self.user.id***REMOVED***
    self.user2 = User.objects.create_user(username='dummyuser', email='test@test.com', password='testtest'***REMOVED***
    self.client = APIClient(***REMOVED***
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key***REMOVED***
    self.dataset = Dataset(name='test_set', owner=self.user***REMOVED***
    self.dataset.save(***REMOVED***
    self.dataset2 = Dataset(name='test_set_2', owner=self.user2***REMOVED***
    self.dataset2.save(***REMOVED***
    self.url = reverse('mainapp:dataset_detail', kwargs={'pk': self.dataset.id***REMOVED******REMOVED***
    self.url2 = reverse('mainapp:dataset_detail', kwargs={'pk': self.dataset2.id***REMOVED******REMOVED***

  def test_modify_dataset(self***REMOVED***:
    correct_variable_names = ('string', 'integer', 'float', 'boolean', 'date'***REMOVED***
    this_dir = os.getcwd(***REMOVED***
    with open(this_dir + '/mainapp/tests/test_files/analyzer_test.csv'***REMOVED*** as test_file:
      data = {'name': 'changed_name', 'file': test_file***REMOVED***
      response = self.client.put(self.url, data***REMOVED***
    #check to see that all fields of the created dataset are correct
    self.assertEqual(response.status_code, status.HTTP_200_OK***REMOVED***
    self.assertEqual(response.data['name'], u'changed_name'***REMOVED***
    self.assertEqual(response.data['owner'], u'api_test_user'***REMOVED***
    self.assertEqual(response.data['variables'].__len__(***REMOVED***, correct_variable_names.__len__(***REMOVED******REMOVED***

  def test_get_dataset(self***REMOVED***:
    response1 = self.client.get(self.url***REMOVED***
    response2 = self.client.get(self.url2***REMOVED***
    self.assertEqual(response1.status_code, status.HTTP_200_OK***REMOVED***
    self.assertEqual(response2.status_code, status.HTTP_403_FORBIDDEN***REMOVED***
    self.assertEqual(response1.data['name'], u'test_set'***REMOVED***
    self.assertEqual(response1.data['owner'], u'api_test_user'***REMOVED***

  def test_delete_dataset(self***REMOVED***:
    response = self.client.delete(self.url***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT***REMOVED***





