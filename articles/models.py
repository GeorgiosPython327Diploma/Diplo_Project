from django.db import models
from django.urls import reverse
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Категория")
    slug = models.SlugField(max_length=100, unique=True, verbose_name="URL")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category', kwargs={'cat_slug': self.slug})

    class Meta:
        verbose_name = "категорию"
        verbose_name_plural = "Категории"


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    photo = models.ImageField(upload_to='photo', blank=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_articles')
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='disliked_articles')
    category = models.ForeignKey('Category', on_delete=models.PROTECT, verbose_name="categories")

    def __str__(self):
        return f"{self.title}"

    def like(self, user):
        self.dislikes.remove(user)

        if not self.likes.filter(id=user.id).exists():
            self.likes.add(user)

    def dislike(self, user):
        self.likes.remove(user)

        if not self.dislikes.filter(id=user.id).exists():
            self.dislikes.add(user)


class Review(models.Model):
    article = models.OneToOneField(Article, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    full_description = models.TextField()
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_reviews')
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='disliked_reviews')
    parent_review = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

    def __str__(self):
        return f"{self.article.title} {self.article.author.username}"


class Comment(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    article = models.ForeignKey('Article', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author.username}"


class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.article.title}"