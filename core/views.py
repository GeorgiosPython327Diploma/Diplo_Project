from django.shortcuts import render
from articles.models import Article

def home(request):
    articles = Article.objects.order_by('-created_at')

    return render(request, 'core/base.html', {'articles': articles})