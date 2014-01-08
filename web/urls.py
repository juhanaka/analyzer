from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from web import views
from django.conf.urls import include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.auth.decorators import login_required


urlpatterns = patterns('web.views',
    url(r'^$', login_required(views.Index.as_view()), name='index'),
    url(r'^login', views.Login.as_view(), name='login'),
    url(r'^logout', views.Logout.as_view(), name='logout'),
)
urlpatterns += staticfiles_urlpatterns()

