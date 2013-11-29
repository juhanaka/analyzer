from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from mainapp import views
from django.conf.urls import include

urlpatterns = patterns('mainapp.views',
    url(r'^datasets/$', views.DatasetList.as_view(***REMOVED******REMOVED***,
    url(r'^datasets/(?P<pk>[0-9]+***REMOVED***/$', views.DatasetDetail.as_view(***REMOVED******REMOVED***,
    url(r'^datasets/(?P<dataset_pk>[0-9]+***REMOVED***/variables/$', views.VariableByDatasetList.as_view(***REMOVED******REMOVED***,
    url(r'^datasets/(?P<dataset_pk>[0-9]+***REMOVED***/variables/(?P<pk>[0-9]+***REMOVED***/$', views.VariableByDatasetDetail.as_view(***REMOVED******REMOVED***,
    url(r'^users/$', views.UserList.as_view(***REMOVED******REMOVED***,
    url(r'^users/(?P<pk>[0-9]+***REMOVED***/$', views.UserDetail.as_view(***REMOVED******REMOVED***,


***REMOVED***

urlpatterns = format_suffix_patterns(urlpatterns***REMOVED***

urlpatterns += patterns('',
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'***REMOVED******REMOVED***,
***REMOVED***