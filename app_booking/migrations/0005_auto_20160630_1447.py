# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-30 14:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_booking', '0004_auto_20160630_1446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='age',
            field=models.CharField(max_length=100, verbose_name='Edad'),
        ),
    ]
