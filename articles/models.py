from django.db import models
from django.conf import settings

class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_articles')
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='disliked_articles')

    def __str__(self):
        return f"{self.title} | Автор => {self.author}"

    def like(self, user):
        self.dislikes.remove(user)

        if not self.likes.filter(id=user.id).exists():
            self.likes.add(user)

    def dislike(self, user):
        self.likes.remove(user)

        if not self.dislikes.filter(id=user.id).exists():
            self.dislikes.add(user)


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.username} on {self.article.title}"

class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Пользователь: {self.user.username} | Закладки: {self.article.title}"