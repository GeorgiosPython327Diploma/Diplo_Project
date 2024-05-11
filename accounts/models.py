from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.utils import timezone

# Модель пользователя, наследующаяся от AbstractUser
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, verbose_name='Имя')  # Поле для имени пользователя
    password = models.CharField(max_length=128, null=False, blank=False, verbose_name='Пароль')  # Поле для пароля пользователя
    bio = models.TextField(blank=True, verbose_name='Биография')  # Поле для биографии пользователя
    country = models.CharField(max_length=50, blank=True, verbose_name='Страна')  # Поле для страны пользователя
    city = models.CharField(max_length=50, blank=True, verbose_name='Город')  # Поле для города пользователя
    is_online = models.BooleanField(default=False, verbose_name='Статус')  # Поле для статуса онлайн/оффлайн пользователя
    occupation = models.CharField(max_length=50, blank=True, verbose_name='Род деятельности')  # Поле для профессии пользователя
    avatar = models.ImageField(upload_to='avatars', blank=True, verbose_name='Аватар')  # Поле для аватара пользователя
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name='Дата')  # Дата регистрации пользователя
    email = models.EmailField(unique=True)  # Поле для электронной почты пользователя
    gender_choices = [
        ('M', 'Мужской'),
        ('F', 'Женский'),
    ]
    gender = models.CharField(max_length=1, choices=gender_choices, blank=True, verbose_name='Пол')  # Поле для указания пола пользователя
    age = models.IntegerField(blank=True, null=True, verbose_name='Возраст')  # Поле для возраста пользователя
    last_login = models.DateTimeField(default=timezone.now)  # Последний вход пользователя
    groups = None
    user_permissions = None

    # Функция для получения URL аватара пользователя
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

    # Функция для проверки статуса онлайн/оффлайн пользователя
    def is_online(self):
        return (timezone.now() - self.last_login).seconds < 3600

    # Функция для обновления времени последнего входа пользователя
    def update_last_login(self):
        self.last_login = timezone.now()
        self.save()

    # Функция для возврата имени пользователя в виде строки
    def __str__(self):
        return self.username

# Модель сообщения
class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)  # Пользователь-отправитель сообщения
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)  # Пользователь-получатель сообщения
    content = models.TextField()  # Содержание сообщения
    timestamp = models.DateTimeField(auto_now_add=True)  # Временная метка создания сообщения
    is_read = models.BooleanField(default=False)  # Флаг, указывающий, прочитано ли сообщение

    # Функция для возврата строки, описывающей сообщение
    def __str__(self):
        return f" {self.sender}  {self.recipient}  {self.timestamp}"