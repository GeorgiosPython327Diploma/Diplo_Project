from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from .models import User, Message

# Форма создания пользователя, наследующаяся от UserCreationForm
class MyUserCreationForm(UserCreationForm):
    # Переопределение полей формы
    username = forms.CharField(label='Логин')
    password1 = forms.CharField(label='Пароль', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Подтверждение пароля',  widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

# Форма аутентификации пользователя, наследующаяся от AuthenticationForm
class MyAuthenticationForm(AuthenticationForm):
    username = forms.CharField(label='Логин')
    password = forms.CharField(label='Пароль',  widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'password']

# Форма профиля пользователя, наследующаяся от ModelForm
class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'bio', 'avatar', 'email', 'country', 'city', 'occupation', 'gender', 'age']

# Форма изменения пароля пользователя, наследующаяся от PasswordChangeForm
class UserPasswordChangeForm(PasswordChangeForm):
    pass

# Форма для поля "О себе" пользователя, наследующаяся от ModelForm
class BioForm(forms.ModelForm):
    # Добавление скрытого поля "is_online"
    is_online = forms.BooleanField(required=False, widget=forms.HiddenInput())

    class Meta:
        model = User
        fields = ['is_online', 'username', 'bio', 'avatar', 'email', 'country', 'city', 'occupation', 'gender', 'age']

    # Инициализация формы
    def __init__(self, *args, **kwargs):
        super(BioForm, self).__init__(*args, **kwargs)
        self.fields['is_online'].initial = self.instance.is_online()

    # Сохранение формы
    def save(self, commit=True):
        user = super(BioForm, self).save(commit)
        user.update_last_login()
        return user

# Форма сообщения, наследующаяся от ModelForm
class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['recipient', 'content']

# Форма составления сообщения, наследующаяся от Form
class ComposeForm(forms.Form):
    # Инициализация формы
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super(ComposeForm, self).__init__(*args, **kwargs)
        if user:
            self.fields['recipient'].queryset = User.objects.exclude(pk=user.pk)

    recipient = forms.ModelChoiceField(queryset=User.objects.none(), label='Отправить')
    content = forms.CharField(widget=forms.Textarea(attrs={'rows': 7}), label='Сообщение', required=False)