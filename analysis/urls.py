from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from analysis import views
from django.conf.urls import include

urlpatterns = patterns('analysis.views',
    url(r'^linear-regression/$', views.LinearRegression.as_view(***REMOVED***, name='linear_regression'***REMOVED***,
    url(r'^one-sample-ttest/$', views.OneSampleTTest.as_view(***REMOVED***, name='one_sample_ttest'***REMOVED***,
***REMOVED***

urlpatterns = format_suffix_patterns(urlpatterns***REMOVED***

