"""
URL configuration for udf project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

# Определение URL-маршрутов приложения
urlpatterns = [
    # Маршрут для административной панели Django
    path('admin/', admin.site.urls),
    # Включение URL-маршрутов приложения "core"
    path('core/', include('core.urls')),
    # Включение URL-маршрутов приложения "accounts"
    path('accounts/', include('accounts.urls')),
    # Основной маршрут для приложения "articles"
    path('', include('articles.urls')),
]

# Добавление дополнительных URL-маршрутов для статических медиафайлов в режиме DEBUG
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)