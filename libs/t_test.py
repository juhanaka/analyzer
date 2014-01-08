from api.models import Variable, Dataset
from scipy import stats
from libs import shapiro

def one_sample_check_variable(variable):
  if variable.datatype == 'float' or variable.datatype == 'integer':
    return True
  return False

def one_sample_t_test(**kwargs):
  variable = kwargs['variable'].values
  sample_size = variable.__len__()
  mean = kwargs['mean']
  t_value, p_value = stats.ttest_1samp(variable, mean)
  shapiro_result = shapiro.shapiro_wilk_test(variable)
  if not shapiro_result['accept_null']:
    return {'t_value': None, 'p_value': None, 'sample_size': sample_size, 'interpretation':None, 
      'accept_null': False, 'shapiro_result': shapiro_result}
  if sample_size > 15:
    if p_value <= 0.05:
      interpretation = 'The mean of the variable is statistically significantly different from ' + str(mean) + ' (confidence interval 95%).'
      accept_null = False
    else:
      interpretation = 'The mean of the variable is not significantly different from ' + str(mean) + ' (confidence interval 95%).'
      accept_null = True
  else:
    interpretation = 'The sample size is too small to conduct the test with statistical significance.'
    accept_null = False
  return {'t_value': t_value, 'p_value': p_value, 'sample_size': sample_size, 'accept_null': accept_null, 'interpretation': interpretation,
    'shapiro_result': shapiro_result}

def two_sample_t_test(**kwargs):
  variable_1 = kwargs['variable_1'].values
  variable_2 = kwargs['variable_2'].values
  sample_size_1 = variable_1.__len__()
  sample_size_2 = variable_2.__len__()
  shapiro_result_1 = shapiro.shapiro_wilk_test(variable_1)
  shapiro_result_2 = shapiro.shapiro_wilk_test(variable_2)
  t_value, p_value = stats.ttest_ind(variable_1, variable_2)
  if not shapiro_result_1['accept_null'] and shapiro_result_2['accept_null']:
    return {'t_value': None, 'p_value': None, 'sample_size_1': sample_size_1, 'sample_size_2': sample_size_2, 'interpretation': None,
      'accept_null': False, 'shapiro_result_1':shapiro_result_1, 'shapiro_result_2': shapiro_result_2}
  if sample_size_1 > 15 and sample_size_2 > 15:
    if p_value <= 0.05:
      interpretation = 'The means of the two variables are significantly different from each other (confidence interval 95%).'
      accept_null = False
    else: 
      interpretation = 'The means of the two variables are not significantly different from each other (confidence interval 95%).'
      accept_null = True
  else:
    interpretation = 'The sample sizes are too small to conduct the test with statistical significance.'
    accept_null = False
  return {'t_value': t_value, 'p_value': p_value, 'sample_size_1': sample_size_1, 'sample_size_2': sample_size_2, 'accept_null': accept_null,
    'interpretation': interpretation, 'shapiro_result_1': shapiro_result_1, 'shapiro_result_2': shapiro_result_2}
