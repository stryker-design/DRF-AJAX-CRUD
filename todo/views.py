from django.shortcuts import render

from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from todo.serializers import Task_list_serializer

# Create your views here.


def index(request):
    context = {}
    return render(request, 'core/index.html', context)

@api_view(['GET'])
def api_overview(request):
    pass

