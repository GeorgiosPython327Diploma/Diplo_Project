from django.urls import path
from .views import RegistrationView, LoginView, user_profile

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user_profile/', user_profile, name='user_profile'),
]
