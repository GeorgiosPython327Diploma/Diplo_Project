from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.utils import timezone

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, verbose_name='Имя')
    password = models.CharField(max_length=128, null=False, blank=False, verbose_name='Пароль')
    bio = models.TextField(blank=True, verbose_name='Биография')
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
    last_login = models.DateTimeField(default=timezone.now)
    groups = None
    user_permissions = None

    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            if self.gender == 'F':
                return settings.STATIC_URL + 'static/images/female_avatar.png'
            elif self.gender == 'M':
                return settings.STATIC_URL + 'static/images/male_avatar.png'
            else:
                return settings.STATIC_URL + 'static/images/standart_img.png'

    def is_online(self):
        return (timezone.now() - self.last_login).seconds < 3600

    def update_last_login(self):
        self.last_login = timezone.now()
        self.save()

    def __str__(self):
        return self.username

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f" {self.sender}  {self.recipient}  {self.timestamp}"