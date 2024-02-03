from django.contrib import admin
from .models import Article, Bookmark
from .forms import ArticleForm, BookmarkForm

class ArticleAdmin(admin.ModelAdmin):
    form = ArticleForm
    list_display = ('title', 'author', 'created_at')

class BookmarkAdmin(admin.ModelAdmin):
    form = BookmarkForm
    list_display = ('user', 'article', 'created_at')


admin.site.register(Article, ArticleAdmin)
admin.site.register(Bookmark, BookmarkAdmin)