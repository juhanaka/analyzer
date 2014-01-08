import pandas

def return_type_and_format_values(values):
  dtype = values.dtype.__str__()
  datatype = None
  formatted = None
  if dtype[:3] == 'int':
    datatype = 'integer'
  elif dtype[:5] == 'float':
    datatype = 'float'
  elif dtype[:4] == 'bool':
    datatype = 'boolean'
  elif dtype == 'object':
    datetime = pandas.to_datetime(values)
    if datetime.dtype.__str__()[:8] == 'datetime':
      formatted = datetime
      datatype = 'date'
    elif datetime.dtype == 'object':
      datatype = 'string' if all(type(value) == str for value in values) else None
  return (datatype, formatted)

def return_default_subtype(datatype):
  if datatype == 'integer':
    return 'discrete'
  elif datatype == 'float':
    return 'continuous'
  elif datatype == 'boolean':
    return 'discrete'
  elif datatype == 'string':
    return 'discrete'
  elif datatype == 'date':
    return 'undefined'
  elif datatype == 'undefined':
    return 'undefined'
  else:
    return 'undefined'
  

