from django.conf.urls import patterns, url

urlpatterns = patterns('mainapp.views',
    url(r'^datasets/$', 'dataset_list'***REMOVED***,
    url(r'^datasets/(?P<pk>[0-9]+***REMOVED***/$', 'dataset_detail'***REMOVED***,
***REMOVED***

