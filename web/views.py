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
    user = User.objects.create_user(username, email, password)
    user.save()
    if user is not None:
      new_user = authenticate(username=request.POST['username'], password=request.POST['password'])
      login(request, new_user)
      return redirect(reverse('web:index'))