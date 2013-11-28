from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from mainapp.models import Dataset, Variable
from mainapp.serializers import DatasetSerializer, VariableSerializer

class JSONResponse(HttpResponse***REMOVED***:
  def __init__(self, data, **kwargs***REMOVED***:
    content = JSONRenderer(***REMOVED***.render(data***REMOVED***
    kwargs['content_type'] = 'application/json'
    super(JSONResponse, self***REMOVED***.__init__(content, **kwargs***REMOVED***

@csrf_exempt
def dataset_list(request***REMOVED***:
    if request.method == 'GET':
        datasets = Dataset.objects.all(***REMOVED***
        serializer = DatasetSerializer(datasets, many=True***REMOVED***
        return JSONResponse(serializer.data***REMOVED***

    elif request.method == 'POST':
        data = JSONParser(***REMOVED***.parse(request***REMOVED***
        serializer = DatasetSerializer(data=data***REMOVED***
        if serializer.is_valid(***REMOVED***:
            serializer.save(***REMOVED***
            return JSONResponse(serializer.data, status=201***REMOVED***
        else:
            return JSONResponse(serializer.errors, status=400***REMOVED***

@csrf_exempt
def dataset_detail(request, pk***REMOVED***:

    try:
        dataset = Dataset.objects.get(pk=pk***REMOVED***
    except Dataset.DoesNotExist:
        return HttpResponse(status=404***REMOVED***

    if request.method == 'GET':
        serializer = DatasetSerializer(dataset***REMOVED***
        return JSONResponse(serializer.data***REMOVED***

    elif request.method == 'PUT':
        data = JSONParser(***REMOVED***.parse(request***REMOVED***
        serializer = DatasetSerializer(dataset, data=data***REMOVED***
        if serializer.is_valid(***REMOVED***:
            serializer.save(***REMOVED***
            return JSONResponse(serializer.data***REMOVED***
        else:
            return JSONResponse(serializer.errors, status=400***REMOVED***

    elif request.method == 'DELETE':
        dataset.delete(***REMOVED***
        return HttpResponse(status=204***REMOVED***