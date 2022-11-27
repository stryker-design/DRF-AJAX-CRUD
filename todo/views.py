from django.shortcuts import render, redirect

from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from todo.serializers import TaskSerializer

from todo.models import Task_list

# Create your views here.


def index(request):
    context = {}
    return render(request, 'core/index.html', context)

@api_view(['GET'])
def api_overview(request):
    # tasks = Task_list.objects.all()
    # serializer = TaskSerializer(tasks, many=True)
    # return Response(serializer.data)

    api_urls = {
	'List':'/task-list/',
	'Detail View':'/task-detail/<str:pk>/',
	'Create':'/task-create/',
	'Update':'/task-update/<str:pk>/',
	'Delete':'/task-delete/<str:pk>/',
	}

    return Response(api_urls)

@api_view(['GET'])
def list_task(request):
    tasks = Task_list.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_task(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return redirect('api-overview')
    return Response(serializer.data)

@api_view(['GET'])
def detail_task(request, pk):
    task = Task_list.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def update_task(request, pk):
    task = Task_list.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def delete_task(request, pk):
    task = Task_list.objects.get(id=pk)
    task.delete()

    return Response('Item deleted')