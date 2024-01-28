from django import forms
from .models import Article, Comment, Review
from tinymce.widgets import TinyMCE

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content']


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']

    content = forms.CharField(widget=TinyMCE(attrs={'cols': 80, 'rows': 30}))


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['rating', 'full_description']