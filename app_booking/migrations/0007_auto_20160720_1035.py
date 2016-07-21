# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-20 10:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_booking', '0006_customer_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='customer_email',
            field=models.EmailField(blank=True, max_length=100, null=True, verbose_name='Email'),
        ),
        migrations.AddField(
            model_name='booking',
            name='customer_first_name',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Nombre'),
        ),
        migrations.AddField(
            model_name='booking',
            name='customer_last_name',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Apellidos'),
        ),
        migrations.AddField(
            model_name='booking',
            name='customer_phone_number',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Telefono'),
        ),
    ]
