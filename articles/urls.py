from django.urls import path
from .views import (
    base_with_articles,
    add_article,
    add_comment,
    like_article,
    dislike_article,
    article_detail,
    add_bookmark,
    remove_bookmark,
    user_bookmarks,
    search_articles,
    get_like_dislike_count,
    review_article,
    user_articles,
    ArticleDeleteView,
    edit_article,
    category_articles,
    about_project
)

urlpatterns = [
    path('', base_with_articles, name='base_with_articles'),  # Основная страница со статьями
    path('add_article/', add_article, name='add_article'),  # Страница добавления статьи
    path('<int:article_id>/add_comment/', add_comment, name='add_comment'),  # Добавление комментария к статье
    path('articles/<int:article_id>/like/', like_article, name='like_article'),  # Лайк статьи
    path('articles/<int:article_id>/dislike/', dislike_article, name='dislike_article'),  # Дизлайк статьи
    path('<int:pk>/', article_detail, name='article_detail'),  # Подробная информация о статье
    path('add_bookmark/<int:article_id>/', add_bookmark, name='add_bookmark'),  # Добавление закладки к статье
    path('remove_bookmark/<int:article_id>/', remove_bookmark, name='remove_bookmark'),  # Удаление закладки у статьи
    path('user_bookmarks/', user_bookmarks, name='user_bookmarks'),  # Закладки пользователя
    path('articles/search/', search_articles, name='search_articles'),  # Поиск статей
    path('get_like_dislike_count/', get_like_dislike_count, name='get_like_dislike_count'),  # Получение количества лайков и дизлайков
    path('<int:pk>/review/', review_article, name='review_article'),  # Обзор статьи
    path('user/<int:user_id>/articles/', user_articles, name='user_articles'),  # Статьи пользователя
    path('article/<int:pk>/delete/', ArticleDeleteView.as_view(), name='delete_article'),  # Удаление статьи
    path('edit_article/<int:article_id>/', edit_article, name='edit_article'),  # Редактирование статьи
    path('category/<int:category_id>/', category_articles, name='category_articles'),  # Статьи в определенной категории
    path('about_project/', about_project, name='about_project'),  # О проекте
]