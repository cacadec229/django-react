# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-06 10:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services_app', '0002_auto_20160606_1011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='image',
            field=models.ImageField(upload_to='../static_files/images/services_app'),
        ),
    ]
