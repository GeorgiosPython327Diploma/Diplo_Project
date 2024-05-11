from django.apps import AppConfig

# Класс конфигурации приложения "accounts"
class AccountsConfig(AppConfig):
    # Указание типа автоматического поля для первичных ключей
    default_auto_field = 'django.db.models.BigAutoField'
    # Указание имени приложения
    name = 'accounts'
