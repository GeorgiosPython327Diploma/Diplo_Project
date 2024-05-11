from django import forms
from .models import Article, Comment, Bookmark, Category
from tinymce.widgets import TinyMCE

# Форма для добавления статьи
class ArticleForm(forms.ModelForm):
    categories = forms.ModelChoiceField(queryset=Category.objects.all(), label='Категория')  # Выбор категории из всех доступных категорий
    class Meta:
        model = Article  # Используемая модель - Article
        fields = ['title', 'content', 'photo', 'categories']  # Поля формы
        widgets = {
            'content': TinyMCE(attrs={'class': 'content_add'}),  # Использование TinyMCE для поля content
        }

# Форма для добавления комментария
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment  # Используемая модель - Comment
        fields = ['content']  # Поле формы - content
        widgets = {
            'content': TinyMCE(attrs={'class': 'content_comment'}),  # Использование TinyMCE для поля content
        }

# Форма для добавления закладки
class BookmarkForm(forms.ModelForm):
    class Meta:
        model = Bookmark  # Используемая модель - Bookmark
        fields = ['user', 'article']  # Поля формы

# Форма для редактирования статьи
class ArticleEditForm(forms.ModelForm):
    category = forms.ModelChoiceField(queryset=Category.objects.all(), required=False, label="Категория")  # Выбор категории из всех доступных категорий
    class Meta:
        model = Article  # Используемая модель - Article
        fields = ['title', 'content', 'photo', 'category']  # Поля формы
        widgets = {
            'content': TinyMCE(attrs={'class': 'content_edit'}),  # Использование TinyMCE для поля content
        }