from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Article, Comment, Bookmark, Review
from .forms import ArticleForm, CommentForm, ReviewForm
from django.http import JsonResponse


BASE_TEMPLATE = 'core/base.html'

def base_with_articles(request):
    articles = Article.objects.order_by('-created_at')
    article_form = ArticleForm()
    comment_form = CommentForm()
    user_has_bookmarks = False
    if request.user.is_authenticated:
        user_has_bookmarks = Bookmark.objects.filter(user=request.user, article__in=articles).exists()

    return render(request, BASE_TEMPLATE, {'articles': articles, 'article_form': article_form, 'comment_form': comment_form, 'user_has_bookmarks': user_has_bookmarks})


def article_detail(request, pk):
    article = get_object_or_404(Article, pk=pk)

    user_has_bookmark = False
    if request.user.is_authenticated:
        user_has_bookmark = article.bookmark_set.filter(user=request.user).exists()

    return render(request, BASE_TEMPLATE, {'article': article, 'user_has_bookmark': user_has_bookmark})


@login_required()
def add_article(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.author = request.user
            article.save()

            return redirect('base_with_articles')
    else:
        form = ArticleForm()

    return render(request, 'articles/add_article.html', {'form': form})


@login_required
def add_comment(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.article = article
            comment.author = request.user
            comment.save()

            return redirect('review_article', pk=article.id)
    else:
        form = CommentForm()

    return render(request, 'articles/review_article.html', {'article': article, 'comment_form': form})


@login_required
def like_article(request, article_id):
    if request.method == 'POST':
        article = Article.objects.get(pk=article_id)
        user = request.user

        if not article.likes.filter(id=user.id).exists():
            article.likes.add(user)
            article.dislikes.remove(user)

            return JsonResponse({'likes': article.likes.count(), 'dislikes': article.dislikes.count(), 'is_liked': True, 'is_disliked': False})

    return JsonResponse({'error': 'Неверный запрос'})


@login_required
def dislike_article(request, article_id):
    if request.method == 'POST':
        article = Article.objects.get(pk=article_id)
        user = request.user

        if not article.dislikes.filter(id=user.id).exists():
            article.dislikes.add(user)
            article.likes.remove(user)

            return JsonResponse({'likes': article.likes.count(), 'dislikes': article.dislikes.count(), 'is_liked': False, 'is_disliked': True})

    return JsonResponse({'error': 'Неверный запрос'})


@login_required
def get_like_dislike_count(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    likes = article.likes.count()
    dislikes = article.dislikes.count()

    return JsonResponse({'likes': likes, 'dislikes': dislikes})


@login_required()
def add_bookmark(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    user = request.user

    if not Bookmark.objects.filter(user=user, article=article).exists():
        bookmark = Bookmark(user=user, article=article)
        bookmark.save()

    return redirect('base_with_articles')


@login_required()
def remove_bookmark(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    user = request.user

    bookmark = Bookmark.objects.filter(user=user, article=article).first()
    if bookmark:
        bookmark.delete()

    return redirect('base_with_articles')

def user_bookmarks(request):
    bookmarks = Bookmark.objects.filter(user=request.user)

    return render(request, 'articles/user_bookmarks.html', {'bookmarks': bookmarks})


def search_articles(request):
    query = request.GET.get('query', '')
    results = []

    if query:
        results = Article.objects.filter(title__icontains=query)

    serialized_results = [
        {
            'id': result.id,
            'title': result.title,
            'content': result.content,
            'author': result.author.username
        }
        for result in results
    ]

    return JsonResponse({'results': serialized_results})


def review_article(request, pk):
    article = get_object_or_404(Article, pk=pk)
    user_has_bookmark = False

    if request.user.is_authenticated:
        user_has_bookmark = article.bookmark_set.filter(user=request.user).exists()

    comment_form = CommentForm()

    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.article = article
            comment.author = request.user
            comment.save()

            return redirect('review_article', pk=pk)

    comments = Comment.objects.filter(article=article)

    return render(request, 'articles/review_article.html', {'article': article, 'user_has_bookmark': user_has_bookmark, 'comment_form': comment_form, 'comments': comments})