from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from web import views
from django.conf.urls import include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = patterns('web.views',
    url(r'^$', views.Index.as_view(***REMOVED***, name='index'***REMOVED***,
***REMOVED***
urlpatterns += staticfiles_urlpatterns(***REMOVED***

