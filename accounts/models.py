from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128, null=False, blank=False)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars', blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    email = None
    is_active = None
    is_staff = None
    is_superuser = None
    last_login = None
    groups = None
    user_permissions = None


    def __str__(self):
        return self.username