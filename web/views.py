from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework import generics
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response


class Index(TemplateView***REMOVED***:
  authentication_classes = (SessionAuthentication,***REMOVED***
  template_name = 'web/base.html'
