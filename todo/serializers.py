from rest_framework import serializers
from todo.models import Task_list

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_list
        fields = '__all__'