from django.conf.urls import patterns, include, url
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, routers
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/v0/', include('api.urls', namespace='api')),
    url(r'^analysis/', include('analysis.urls', namespace='analysis')),
    url(r'^', include('web.urls', namespace='web')),
)

class UserViewSet(viewsets.ModelViewSet):
    model = User

class GroupViewSet(viewsets.ModelViewSet):
    model = Group

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)


