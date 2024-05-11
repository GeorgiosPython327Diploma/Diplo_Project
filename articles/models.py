from django.db import models
from django.urls import reverse
from django.conf import settings

# Модель категории
class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Категория")  # Название категории
    slug = models.SlugField(max_length=100, unique=True, verbose_name="URL")  # Уникальный URL-адрес категории
    icon = models.ImageField(upload_to='images_ico/icons/', blank=True, null=True, verbose_name='Иконка')  # Изображение иконки категории

    def __str__(self):
        return self.name  # Возвращает строковое представление названия категории

    def get_absolute_url(self):
        return reverse('category', kwargs={'cat_slug': self.slug})  # Возвращает абсолютный URL для категории

    class Meta:
        verbose_name = "категорию"  # Название категории в единственном числе
        verbose_name_plural = "Категории"  # Название категории во множественном числе


# Модель статьи
class Article(models.Model):
    title = models.CharField(max_length=255, verbose_name='Статья')  # Заголовок статьи
    content = models.TextField(verbose_name='Контент')  # Содержание статьи
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='Автор')  # Автор статьи
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата')  # Дата создания статьи
    photo = models.ImageField(upload_to='photo', blank=True, verbose_name='Изображение')  # Изображение для статьи
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_articles')  # Пользователи, поставившие лайк
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='disliked_articles')  # Пользователи, поставившие дизлайк
    category = models.ForeignKey('Category', on_delete=models.PROTECT, verbose_name="Категория")  # Категория статьи
    views = models.PositiveIntegerField(default=0, verbose_name='Просмотры')  # Количество просмотров

    def __str__(self):
        return f"{self.title}"  # Возвращает строковое представление статьи

    def like(self, user):
        self.dislikes.remove(user)

        if not self.likes.filter(id=user.id).exists():
            self.likes.add(user)  # Пользователь поставил лайк

    def dislike(self, user):
        self.likes.remove(user)

        if not self.dislikes.filter(id=user.id).exists():
            self.dislikes.add(user)  # Пользователь поставил дизлайк

    def increment_views(self, user=None):
        if user and user.is_authenticated:
            self.views += 1
            self.save()  # Увеличивает количество просмотров статьи


# Модель обзора
class Review(models.Model):
    article = models.OneToOneField(Article, on_delete=models.CASCADE)  # Связь с моделью Article
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])  # Рейтинг обзора
    full_description = models.TextField()  # Полное описание обзора
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_reviews')  # Пользователи, поставившие лайк
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='disliked_reviews')  # Пользователи, поставившие дизлайк
    parent_review = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')  # Родительский обзор (если есть)

    def __str__(self):
        return f"{self.article.title} {self.article.author.username}"  # Возвращает строковое представление обзора


# Модель комментария
class Comment(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Автор комментария
    content = models.TextField(verbose_name='Контент')  # Содержание комментария
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания комментария
    article = models.ForeignKey('Article', on_delete=models.CASCADE)  # Связь с моделью Article

    def __str__(self):
        return f"{self.author.username}"  # Возвращает строковое представление автора комментария


# Модель закладки
class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='Пользователь')  # Пользователь, который добавил закладку
    article = models.ForeignKey(Article, on_delete=models.CASCADE, verbose_name='Статья')  # Статья, на которую добавлена закладка
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата')  # Дата создания закладки

    def __str__(self):
        return f"{self.article.title}"  # Возвращает строковое представление статьи, на которую добавлена закладка
