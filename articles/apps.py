from django.apps import AppConfig

# Класс конфигурации приложения "articles"
class ArticlesConfig(AppConfig):
    # Указание типа автоматического поля для первичных ключей
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'articles'  # Указание имени приложения
