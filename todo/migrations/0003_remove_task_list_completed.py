# Generated by Django 4.1.3 on 2022-11-27 16:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_task_list_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task_list',
            name='completed',
        ),
    ]
