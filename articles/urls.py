from django.urls import path
from .views import base_with_articles,  add_article, add_comment, like_article, dislike_article, article_detail, add_bookmark, remove_bookmark, user_bookmarks, search_articles, get_like_dislike_count, review_article, user_articles, ArticleDeleteView, edit_article, category_articles,  about_project

urlpatterns = [
    path('', base_with_articles, name='base_with_articles'),
    path('add_article/', add_article, name='add_article'),
    path('<int:article_id>/add_comment/', add_comment, name='add_comment'),
    path('articles/<int:article_id>/like/', like_article, name='like_article'),
    path('articles/<int:article_id>/dislike/', dislike_article, name='dislike_article'),
    path('<int:pk>/', article_detail, name='article_detail'),
    path('add_bookmark/<int:article_id>/', add_bookmark, name='add_bookmark'),
    path('remove_bookmark/<int:article_id>/', remove_bookmark, name='remove_bookmark'),
    path('user_bookmarks/', user_bookmarks, name='user_bookmarks'),
    path('articles/search/', search_articles, name='search_articles'),
    path('get_like_dislike_count/<int:article_id>/', get_like_dislike_count, name='get_like_dislike_count'),
    path('<int:pk>/review/', review_article, name='review_article'),
    path('user/<int:user_id>/articles/', user_articles, name='user_articles'),
    path('article/<int:pk>/delete/', ArticleDeleteView.as_view(), name='delete_article'),
    path('edit_article/<int:article_id>/', edit_article, name='edit_article'),
    path('category/<int:category_id>/', category_articles, name='category_articles'),
    path('about_project/', about_project, name='about_project'),
]