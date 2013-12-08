from api.models import Variable, Dataset
from scipy import stats

def LinearRegressionCalc(**kwargs***REMOVED***:
  x = kwargs['x'].values
  y = kwargs['y'].values
  slope, intercept, r_value, p_value, std_err = stats.linregress(x,y***REMOVED***
  r_squared = r_value**2
  return {'slope':slope, 'intercept':intercept, 'r_squared':r_squared, 'p_value':p_value, 'stderr':std_err***REMOVED***

def check_variables(*args***REMOVED***:
  return all(variable.datatype == 'integer' or variable.datatype == 'float' for variable in args***REMOVED***