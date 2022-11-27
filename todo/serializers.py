from rest_framework import serializers
from todo.models import Task_list

class Task_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = Task_list
        fields = '__all__'