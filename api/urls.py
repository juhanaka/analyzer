from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from api import views
from django.conf.urls import include

urlpatterns = patterns('api.views',
    url(r'^datasets/$', views.DatasetList.as_view(), name='dataset_list'),
    url(r'^datasets/(?P<pk>[0-9]+)/$', views.DatasetDetail.as_view(), name='dataset_detail'),
    url(r'^datasets/(?P<dataset_pk>[0-9]+)/variables/$', views.VariableByDatasetList.as_view(), name='variable_by_dataset_list'),
    url(r'^datasets/(?P<dataset_pk>[0-9]+)/variables/(?P<pk>[0-9]+)/$', views.VariableByDatasetDetail.as_view(), name='variable_by_dataset_detail'),
    url(r'^users/$', views.UserList.as_view(), name='user_list'),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user_detail'),
)

urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += patterns('',
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)

urlpatterns += patterns('',
    url(r'^api-token-auth/', views.GetAPIToken.as_view(), name='get_api_token')
)