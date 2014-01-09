from scipy import stats

def shapiro_wilk_test(variable):
  sample_size = variable.__len__()
  if sample_size > 3 and sample_size < 3000:
    W, p_value = stats.shapiro(variable)
    if p_value <= 0.05:
      interpretation = 'The sample is not from a normally distributed population (confidence interval 95%).'
      accept_null = False
    else:
      interpretation = 'The sample is from a normally distributed population (confidence interval 95%).'
      accept_null = True
  elif sample_size <= 3:
    interpretation = 'The sample size is too small.'
    accept_null = False
  elif sample_size >= 3000:
    interpretation = 'The sample size is too large'
    accept_null = False
  return {'W': W, 'p_value': p_value, 'sample_size': sample_size, 'interpretation': interpretation, 'accept_null': accept_null}

