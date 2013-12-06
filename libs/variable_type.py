from mainapp.models import variable_datatype_choices
import pandas

def return_type_and_format_values(values***REMOVED***:
  dtype = values.dtype.__str__(***REMOVED***
  datatype = None
  formatted = None
  if dtype[:3] == 'int':
    datatype = 'integer'
  elif dtype[:5] == 'float':
    datatype = 'float'
  elif dtype[:4] == 'bool':
    datatype = 'boolean'
  elif dtype == 'object':
    datetime = pandas.to_datetime(values***REMOVED***
    if datetime.dtype.__str__(***REMOVED***[:8] == 'datetime':
      formatted = datetime
      datatype = 'date'
    elif datetime.dtype == 'object':
      datatype = 'string' if all(type(value***REMOVED*** == str for value in values***REMOVED*** else None
  return (datatype, formatted***REMOVED***

