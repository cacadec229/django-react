# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-07 14:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services_app', '0007_customerdisplay_vetsdisplay'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerdisplay',
            name='opinion',
            field=models.TextField(max_length=250),
        ),
    ]
