from django.contrib import admin
from django.urls import path, include
from .import views


urlpatterns = [
    path('', views.api_overview, name='api-overview'),
    path('task-list/', views.index, name='task-list'),

    # CRUD URLS
    path('task-create/', views.index, name='task-create'),
    path('task-update/', views.index, name='task-update'),
    path('task-delete/', views.index, name='task-delete'),
]