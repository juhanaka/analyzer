from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from analysis import views
from django.conf.urls import include

#Declare url patterns for the analysis app and direct the incoming requests to correct views.
urlpatterns = patterns('analysis.views',
    url(r'^linear-regression/$', views.LinearRegression.as_view(), name='linear_regression'),
    url(r'^one-sample-ttest/$', views.OneSampleTTest.as_view(), name='one_sample_ttest'),
    url(r'^two-sample-ttest/$', views.TwoSampleTTest.as_view(), name='two_sample_ttest'),
)

urlpatterns = format_suffix_patterns(urlpatterns)

