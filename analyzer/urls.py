from django.conf.urls import patterns, include, url
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, routers
from django.contrib import admin

admin.autodiscover(***REMOVED***

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'analyzer.views.home', name='home'***REMOVED***,
    # url(r'^blog/', include('blog.urls'***REMOVED******REMOVED***,

    url(r'^admin/', include(admin.site.urls***REMOVED******REMOVED***,
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'***REMOVED******REMOVED***,
    url(r'^api/v0/', include('mainapp.urls', namespace='mainapp'***REMOVED******REMOVED***,
***REMOVED***

class UserViewSet(viewsets.ModelViewSet***REMOVED***:
    model = User

class GroupViewSet(viewsets.ModelViewSet***REMOVED***:
    model = Group

router = routers.DefaultRouter(***REMOVED***
router.register(r'users', UserViewSet***REMOVED***
router.register(r'groups', GroupViewSet***REMOVED***

