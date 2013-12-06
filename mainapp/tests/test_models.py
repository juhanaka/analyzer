from django.test import TestCase
from django.contrib.auth.models import User
from mainapp.models import Dataset, Variable
from pandas.io.parsers import read_csv
from libs.variable_type import return_type_and_format_values
***REMOVED***

class CreateDatasetTest(TestCase***REMOVED***:
  def setUp(self***REMOVED***:
    self.user = User.objects.create_user(username='test_user', email='test@test.com', password='testtest'***REMOVED***

  def test_create_dataset(self***REMOVED***:
    correct_variable_names = ('string', 'integer', 'float', 'boolean', 'date'***REMOVED***
    this_dir = os.getcwd(***REMOVED***
    with open(this_dir + '/mainapp/tests/test_files/analyzer_test.csv'***REMOVED*** as file_obj:
      dataset = Dataset(name='test_set', owner=self.user***REMOVED***
      dataset.save(***REMOVED***
      file_obj = read_csv(file_obj, sep=',', header=0***REMOVED***
      for column in file_obj:
        (datatype, values***REMOVED*** = return_type_and_format_values(file_obj[column]***REMOVED***
        values = values if values is not None else file_obj[column]
        datatype = datatype if datatype else 'undefined'
        v = Variable(name=column, dataset=dataset, datatype=datatype, values=values***REMOVED***
        v.save(***REMOVED***
    self.assertEqual(Dataset.objects.get(name='test_set'***REMOVED***, dataset***REMOVED***
    for name in correct_variable_names:
      variable = Variable.objects.get(name=name***REMOVED***
      self.assertEqual(variable.dataset.name, 'test_set'***REMOVED***
      self.assertEqual(variable.values.__len__(***REMOVED***, 20***REMOVED***
      self.assertEqual(variable.datatype, name***REMOVED***