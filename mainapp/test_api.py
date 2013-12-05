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
class DatasetListPost(TestCase***REMOVED***:

  def setUp(self***REMOVED***:
    self.user = User.objects.create_user(username='api_test_user', email='test@test.com', password='testtest'***REMOVED***
    self.token = Token.objects.get(user=self.user.id***REMOVED***
    self.client = APIClient(***REMOVED***
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key***REMOVED***
    self.url = reverse('mainapp:dataset_list'***REMOVED***

  def test_create_dataset(self***REMOVED***:
    #send a post request with test csv file
    with open(os.path.expanduser('~/own_code/data_analysis_tool/analyzer/mainapp/test_files/analyzer_test_2.csv'***REMOVED******REMOVED*** as test_file:
      data = {'name': 'test_set', 'file': test_file***REMOVED***
      response = self.client.post(self.url, data***REMOVED***
    
    #check to see that all fields of the created dataset are correct
    self.assertEqual(response.status_code, status.HTTP_201_CREATED***REMOVED***
    self.assertEqual(response.data['name'], u'test_set'***REMOVED***
    self.assertEqual(response.data['owner'], u'api_test_user'***REMOVED***
    self.assertEqual(response.data['variables'], [9, 8, 7, 6, 5, 4, 3, 2, 1]***REMOVED***

    #check to see that all variables, that were column headers in csv file, have been created
    #and are assigned to correct dataset and have the correct amount of data
    correct_variable_names = ('P', 'D', 'E', 'CPI', 'Fraction', 'Rate GS10', 'Price', 'Dividend', 'Earnings'***REMOVED***
    for name in correct_variable_names:
      variable = Variable.objects.get(name=name***REMOVED***
      self.assertEqual(variable.dataset.name, 'test_set'***REMOVED***
      self.assertEqual(variable.data.__len__(***REMOVED***, 1000***REMOVED***
      self.assertEqual(variable.datatype, 'string'***REMOVED***


  #create a dataset with just name and no file. The dataset should be created.
  def test_create_dataset_nofile(self***REMOVED***:
    data = {'name': 'test_set'***REMOVED***
    response = self.client.post(self.url, data***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_201_CREATED***REMOVED***
    self.assertEqual(response.data['name'], u'test_set'***REMOVED***
    self.assertEqual(response.data['owner'], u'api_test_user'***REMOVED***

  #create a dataset without a name. this should fail.
  def test_create_dataset_noname(self***REMOVED***:
    with open(os.path.expanduser('~/own_code/data_analysis_tool/analyzer/mainapp/test_files/analyzer_test_2.csv'***REMOVED******REMOVED*** as test_file:
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
class DatasetListGet(TestCase***REMOVED***:
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
  def test_show_databases_by_owner(self***REMOVED***:
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key***REMOVED***
    response = self.client.get(self.url***REMOVED***
    self.assertEqual(response.data.__len__(***REMOVED***, 1***REMOVED***
    self.assertEqual(response.data[0]['name'], u'dataset1'***REMOVED***
    self.assertEqual(response.data[0]['owner'], u'api_test_user_1'***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_200_OK***REMOVED***


    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token2.key***REMOVED***
    response = self.client.get(self.url***REMOVED***
    self.assertEqual(response.data.__len__(***REMOVED***, 1***REMOVED***
    self.assertEqual(response.data[0]['name'], u'dataset2'***REMOVED***
    self.assertEqual(response.data[0]['owner'], u'api_test_user_2'***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_200_OK***REMOVED***

  #Test that unauthorized gets result in a 401 status code.
  def test_list_dataset_noauth(self***REMOVED***:
    self.client.credentials(***REMOVED***
    response = self.client.get(self.url***REMOVED***
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED***REMOVED***



