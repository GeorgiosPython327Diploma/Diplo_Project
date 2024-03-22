from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from .forms import MyUserCreationForm, MyAuthenticationForm, UserProfileForm,  UserPasswordChangeForm, BioForm, ComposeForm
from .models import User, Message
from django.db.models import Sum
from articles.models import Article
from django.http import JsonResponse

def register_user(request):
    if request.method == 'POST':
        form = MyUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('base')
    else:
        form = MyUserCreationForm()

    return render(request, 'registration/register.html', {'form': form})


def login_user(request):
    if request.method == 'POST':
        form = MyAuthenticationForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)

            return redirect('user_profile')
    else:
        form = MyAuthenticationForm()

    return render(request, 'registration/login.html', {'form': form})


def user_logout(request):
    logout(request)

    return redirect(reverse('base_with_articles'))


@login_required
def user_profile(request):

    return render(request, 'accounts/user_profile.html', {'user': request.user, 'avatar_url': request.user.avatar_url})


@login_required
def edit_profile(request):
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('user_profile')
    else:
        form = UserProfileForm(instance=request.user)

    return render(request, 'accounts/edit_profile.html', {'form': form})


@login_required
def change_password(request):
    if request.method == 'POST':
        form = UserPasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            form.save()

            return redirect('user_profile')
    else:
        form = UserPasswordChangeForm(request.user)

    return render(request, 'accounts/change_password.html', {'form': form})


@login_required
def bio_view(request):
    user = request.user
    bio_form = BioForm(instance=user)
    articles = Article.objects.filter(author=user)

    if request.method == 'POST':
        bio_form = BioForm(request.POST, request.FILES, instance=user)
        if bio_form.is_valid():
            bio_form.save()
            user.update_last_login()
            return redirect('bio_view')

    total_views = articles.aggregate(Sum('views'))['views__sum'] or 0

    context = {
        'user': user,
        'avatar_url': user.avatar_url(),
        'is_online': user.is_online(),
        'bio_form': bio_form,
        'total_views': total_views,
    }

    return render(request, 'accounts/bio.html', context)


def public_profile(request, username):
    user = get_object_or_404(User, username=username)
    is_public_profile = True

    if request.method == 'POST':
        bio_form = BioForm(request.POST, request.FILES, instance=user)
        if bio_form.is_valid():
            bio_form.save()
            return redirect('public_profile', username=username)
    else:
        bio_form = BioForm(instance=user)

    return render(request, 'accounts/public_profile.html', {'user': user, 'avatar_url': user.avatar_url(), 'bio_form': bio_form, 'is_public_profile': is_public_profile})

@login_required
def inbox(request):
    unread_messages = Message.objects.filter(recipient=request.user, is_read=False)
    for message in unread_messages:
        message.is_read = True
        message.save()

    messages = Message.objects.filter(recipient=request.user).order_by('-timestamp')
    return render(request, 'messages/inbox.html', {'messages': messages})


def unread_message_count(request, message_id=None):
    if request.user.is_authenticated:
        if message_id:
            message = Message.objects.filter(id=message_id, recipient=request.user, is_read=False).first()
            if message:
                message.is_read = True
                message.save()

        unread_count = Message.objects.filter(recipient=request.user, is_read=False).count()
        sender_name = None
        if unread_count > 0:
            sender_name = Message.objects.filter(recipient=request.user, is_read=False).first().sender.username

        return JsonResponse({'unread_count': unread_count, 'sender': sender_name})
    else:
        return JsonResponse({'unread_count': 0, 'sender': None})


@login_required
def compose(request):
    if request.method == 'POST':
        form = ComposeForm(request.POST, user=request.user)
        if form.is_valid():
            recipient = form.cleaned_data['recipient']
            content = form.cleaned_data['content']
            message = Message.objects.create(sender=request.user, recipient=recipient, content=content)
            message.is_read = False
            message.save()
            return redirect('bio_view')
    else:
        form = ComposeForm(user=request.user)
    return render(request, 'messages/compose.html', {'form': form})