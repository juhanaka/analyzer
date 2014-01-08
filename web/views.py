from django.shortcuts import render, render_to_response, redirect
from django.views.generic import TemplateView, View
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework import generics
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from django.template import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from django.http import HttpResponse

class Index(TemplateView***REMOVED***:
  authentication_classes = (SessionAuthentication,***REMOVED***
  template_name = 'web/base.html'


class Login(View***REMOVED***:

  def get(self, request***REMOVED***:
    return render_to_response('web/login.html', context_instance=RequestContext(request***REMOVED******REMOVED***

  def post(self, request***REMOVED***:
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password***REMOVED***
    if user is not None:
      if user.is_active:
        login(request, user***REMOVED***
        return redirect(reverse('web:index'***REMOVED******REMOVED***

class Logout(View***REMOVED***:

  def get(self, request***REMOVED***:
    logout(request***REMOVED***
    return redirect(reverse('web:login'***REMOVED******REMOVED***