from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, verbose_name='Имя')
    password = models.CharField(max_length=128, null=False, blank=False, verbose_name='Пароль')
    bio = models.TextField(blank=True,verbose_name='Биография')
    country = models.CharField(max_length=50, blank=True, verbose_name='Страна')
    city = models.CharField(max_length=50, blank=True, verbose_name='Город')
    is_online = models.BooleanField(default=False, verbose_name='Статус')
    occupation = models.CharField(max_length=50, blank=True, verbose_name='Род деятельности')
    avatar = models.ImageField(upload_to='avatars', blank=True, verbose_name='Аватар')
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name='Дата')
    email = models.EmailField(unique=True)
    gender_choices = [
        ('M', 'Мужской'),
        ('F', 'Женский'),
    ]
    gender = models.CharField(max_length=1, choices=gender_choices, blank=True, verbose_name='Пол')
    age = models.IntegerField(blank=True, null=True, verbose_name='Возраст')
    last_login = None
    groups = None
    user_permissions = None

    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return settings.STATIC_URL + 'static/images/standart_img.png'

    def __str__(self):
        return self.username