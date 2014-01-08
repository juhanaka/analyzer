from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Dataset, Variable
from pandas.io.parsers import read_csv
from libs.variable_type import return_type_and_format_values, return_default_subtype
import os

class CreateDatasetTest(TestCase):
  def setUp(self):
    self.user = User.objects.create_user(username='test_user', email='test@test.com', password='testtest')

  def test_create_dataset(self):
    correct_variable_names = ('string', 'integer', 'float', 'boolean', 'date')
    correct_variable_subtypes = {'string': 'discrete', 'integer': 'discrete', 'float': 'continuous', 'boolean': 'discrete', 'date': 'undefined'}
    this_dir = os.getcwd()
    with open(this_dir + '/api/tests/test_files/analyzer_test.csv') as file_obj:
      dataset = Dataset(name='test_set', owner=self.user)
      dataset.save()
      file_obj = read_csv(file_obj, sep=',', header=0)
      for column in file_obj:
        (datatype, values) = return_type_and_format_values(file_obj[column])
        values = values if values is not None else file_obj[column]
        datatype = datatype if datatype else 'undefined'
        subtype = return_default_subtype(datatype)
        v = Variable(name=column, dataset=dataset, datatype=datatype, subtype=subtype, values=values)
        v.save()
    self.assertEqual(Dataset.objects.get(name='test_set'), dataset)
    for name in correct_variable_names:
      variable = Variable.objects.get(name=name)
      self.assertEqual(variable.dataset.name, 'test_set')
      self.assertEqual(variable.values.__len__(), 20)
      self.assertEqual(variable.datatype, name)
      self.assertEqual(variable.subtype, correct_variable_subtypes[name])