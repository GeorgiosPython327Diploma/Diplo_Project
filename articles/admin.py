from django.contrib import admin
from .models import Article, Bookmark
from .forms import ArticleForm, BookmarkForm

class ArticleAdmin(admin.ModelAdmin):
    form = ArticleForm
    list_display = ('title', 'author', 'created_at', 'get_likes_count', 'get_dislikes_count')

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_dislikes_count(self, obj):
        return obj.dislikes.count()

    def get_like_dislike_count(self, obj):
        likes = obj.likes.count()
        dislikes = obj.dislikes.count()
        return f'Likes: {likes}, Dislikes: {dislikes}'

    get_likes_count.short_description = 'Likes'
    get_dislikes_count.short_description = 'Dislikes'
    get_like_dislike_count.short_description = 'Like/Dislike Counts'

class BookmarkAdmin(admin.ModelAdmin):
    form = BookmarkForm
    list_display = ('user', 'article', 'created_at')


admin.site.register(Article, ArticleAdmin)
admin.site.register(Bookmark, BookmarkAdmin)