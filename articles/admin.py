from django.contrib import admin
from .models import Article, Bookmark, Category
from django import forms
from tinymce.widgets import TinyMCE
from django.utils.html import format_html

# Определение формы для администрирования статей
class ArticleAdminForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = '__all__'
        widgets = {
            'content': TinyMCE(),  # Использование редактора TinyMCE для поля content
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Делаем поля likes и dislikes необязательными
        self.fields['likes'].required = False
        self.fields['dislikes'].required = False

# Класс для отображения и управления административным интерфейсом статей
class ArticleAdmin(admin.ModelAdmin):
    form = ArticleAdminForm
    list_display = ('title', 'author', 'created_at', 'get_likes_count', 'get_dislikes_count', 'display_categories', 'photo_preview')

    def get_likes_count(self, obj):
        return obj.likes.count()  # Получаем количество лайков для статей

    def get_dislikes_count(self, obj):
        return obj.dislikes.count()  # Получаем количество дизлайков для статей

    def display_categories(self, obj):
        return ", ".join([obj.category.name])  # Отображение категории для статьи

    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" width="100" height="70" />', obj.photo.url)  # Предварительный просмотр изображения
        else:
            return 'No Photo'  # В случае отсутствия изображения

    # Настройка оформления колонок
    display_categories.short_description = 'Категории'
    photo_preview.allow_tags = True
    photo_preview.short_description = 'Изображение'
    get_likes_count.short_description = 'Likes'
    get_dislikes_count.short_description = 'Dislikes'

# Класс для отображения и управления административным интерфейсом закладок
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'article', 'created_at')

# Класс для отображения и управления административным интерфейсом категорий
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ('id', 'name', 'icon_preview')
    list_display_links = ('id', 'name')
    search_fields = ('name',)

    def icon_preview(self, obj):
        if obj.icon:
            return format_html('<img src="{}" width="50" height="50" />', obj.icon.url)  # Предварительный просмотр иконки
        else:
            return 'No Icon'  # В случае отсутствия иконки

    icon_preview.allow_tags = True
    icon_preview.short_description = 'Иконка'

# Регистрация моделей в административном интерфейсе
admin.site.register(Article, ArticleAdmin)
admin.site.register(Bookmark, BookmarkAdmin)
admin.site.register(Category, CategoryAdmin)