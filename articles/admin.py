from django.contrib import admin
from .models import Article, Bookmark, Category
from django import forms
from tinymce.widgets import TinyMCE
from django.utils.html import format_html

class ArticleAdminForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = '__all__'
        widgets = {
            'content': TinyMCE(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['likes'].required = False
        self.fields['dislikes'].required = False

class ArticleAdmin(admin.ModelAdmin):
    form = ArticleAdminForm
    list_display = ('title', 'author', 'created_at', 'get_likes_count', 'get_dislikes_count', 'category')

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_dislikes_count(self, obj):
        return obj.dislikes.count()

    def display_categories(self, obj):
        return ", ".join([category.name for category in obj.category.all()])

    display_categories.short_description = 'Категории'

    get_likes_count.short_description = 'Likes'
    get_dislikes_count.short_description = 'Dislikes'


class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'article', 'created_at')


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ('id', 'name', 'icon_preview')
    list_display_links = ('id', 'name')
    search_fields = ('name',)

    def icon_preview(self, obj):
        if obj.icon:
            return format_html('<img src="{}" width="50" height="50" />', obj.icon.url)
        else:
            return 'No Icon'

    icon_preview.allow_tags = True
    icon_preview.short_description = 'Icon Preview'


admin.site.register(Article, ArticleAdmin)
admin.site.register(Bookmark, BookmarkAdmin)
admin.site.register(Category, CategoryAdmin)