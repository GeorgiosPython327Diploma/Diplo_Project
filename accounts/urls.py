from django.urls import path
from .views import register_user, login_user, user_profile, edit_profile, change_email, change_password, user_logout

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('user/profile/', user_profile, name='user_profile'),
    path('edit_profile/', edit_profile, name='edit_profile'),
    path('change_email/', change_email, name='change_email'),
    path('change_password/', change_password, name='change_password'),
    path('logout/', user_logout, name='logout'),
]