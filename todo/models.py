from django.db import models

# Create your models here.


class Task_list(models.Model):
    # task_type = models.Choices()
    task = models.CharField(max_length=255)
    completed = models.BooleanField(default=False, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.task