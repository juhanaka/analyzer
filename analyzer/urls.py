from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover(***REMOVED***

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'analyzer.views.home', name='home'***REMOVED***,
    # url(r'^blog/', include('blog.urls'***REMOVED******REMOVED***,

    url(r'^admin/', include(admin.site.urls***REMOVED******REMOVED***,
***REMOVED***
