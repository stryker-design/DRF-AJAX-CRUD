from django.contrib import admin
from django.urls import path, include
from .import views


urlpatterns = [
    path('', views.index, name='task-list'),
    path('api', views.api_overview, name='api-overview'),

    # CRUD URLS
    path('api/task-create/', views.add_task, name='task-create'),
    path('api/task-list/', views.list_task, name='task-list'),
    path('api/task-detail/<int:pk>', views.detail_task, name='task-detail'),
    path('api/task-update/<int:pk>', views.update_task, name='task-update'),
    path('api/task-delete/<int:pk>', views.delete_task, name='task-delete'),
]