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
from django.contrib.auth.models import User
from django.db import IntegrityError

class Index(TemplateView):
  authentication_classes = (SessionAuthentication,)
  template_name = 'web/base.html'


class Login(View):

  def get(self, request):
    return render_to_response('web/login.html', context_instance=RequestContext(request))

  def post(self, request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
      if user.is_active:
        login(request, user)
        return redirect(reverse('web:index'))
    else:
      return HttpResponse('Wrong username or password.')

class Logout(View):

  def get(self, request):
    logout(request)
    return redirect(reverse('web:login'))


class Register(View):

  def get(self, request):
    return render_to_response('web/register.html', context_instance=RequestContext(request))

  def post(self, request):
    username = request.POST['username']
    password = request.POST['password']
    email = request.POST['email']
    try:
      user = User.objects.create_user(username=username, password=password)
      user.save()
      if user is not None:
        new_user = authenticate(username=username, password=password)
        login(request, new_user)
        return redirect(reverse('web:index'))
    except IntegrityError:
      return HttpResponse('Username already exists, please choose another one')
