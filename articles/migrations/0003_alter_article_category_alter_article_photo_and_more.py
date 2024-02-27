# Generated by Django 5.0.1 on 2024-02-23 12:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_alter_article_content_alter_article_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='articles.category', verbose_name='Категория'),
        ),
        migrations.AlterField(
            model_name='article',
            name='photo',
            field=models.ImageField(blank=True, upload_to='photo', verbose_name='Изображение'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='content',
            field=models.TextField(verbose_name='Контент'),
        ),
    ]
