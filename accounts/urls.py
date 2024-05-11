from django.urls import path
from .views import (
    register_user,
    login_user,
    user_profile,
    edit_profile,
    change_password,
    user_logout,
    bio_view,
    public_profile,
    inbox,
    compose,
    unread_message_count
)

# Определение URL-маршрутов для приложения accounts
urlpatterns = [
    # URL для регистрации нового пользователя
    path('register/', register_user, name='register'),
    # URL для входа пользователя в систему
    path('login/', login_user, name='login'),
    # URL для просмотра и редактирования профиля пользователя
    path('user/profile/', user_profile, name='user_profile'),
    # URL для редактирования профиля пользователя
    path('edit_profile/', edit_profile, name='edit_profile'),
    # URL для изменения пароля пользователя
    path('change_password/', change_password, name='change_password'),
    # URL для выхода пользователя из системы
    path('logout/', user_logout, name='logout'),
    # URL для просмотра биографии пользователя
    path('bio/', bio_view, name='bio_view'),
    # URL для просмотра публичного профиля другого пользователя
    path('profile/<str:username>/', public_profile, name='public_profile'),
    # URL для просмотра входящих сообщений пользователя
    path('inbox/', inbox, name='inbox'),
    # URL для отправки сообщения другому пользователю
    path('compose/', compose, name='compose'),
    # URL для получения количества непрочитанных сообщений пользователя
    path('unread_message_count/', unread_message_count, name='unread_message_count'),
]