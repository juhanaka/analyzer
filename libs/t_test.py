from api.models import Variable, Dataset
from scipy import stats
from libs import shapiro

def one_sample_check_variable(variable***REMOVED***:
  if variable.datatype == 'float' or variable.datatype == 'integer':
    return True
  return False

def one_sample_t_test(**kwargs***REMOVED***:
  variable = kwargs['variable'].values
  sample_size = variable.__len__(***REMOVED***
  mean = kwargs['mean']
  t_value, p_value = stats.ttest_1samp(variable, mean***REMOVED***
  shapiro_result = shapiro.shapiro_wilk_test(variable***REMOVED***
  if not shapiro_result['accept_null']:
    return {'t_value': None, 'p_value': None, 'sample_size': sample_size, 'interpretation':None, 
      'accept_null': False, 'shapiro_result': shapiro_result***REMOVED***
  if sample_size > 15:
    if p_value <= 0.05:
      interpretation = 'The mean of the sample is statistically significantly different from ' + str(mean***REMOVED*** + ' (confidence interval 95%***REMOVED***.'
      accept_null = False
    else:
      interpretation = 'The mean of the sample is not significantly different from ' + str(mean***REMOVED*** + ' (confidence interval 95%***REMOVED***.'
      accept_null = True
  else:
    interpretation = 'The sample size is too small to conduct the test with statistical significance.'
    accept_null = False
  return {'t_value': t_value, 'p_value': p_value, 'sample_size': sample_size, 'accept_null': accept_null, 'interpretation': interpretation,
    'shapiro_result': shapiro_result***REMOVED***