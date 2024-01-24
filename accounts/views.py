from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import MyUserCreationForm, MyAuthenticationForm, UserProfileForm, UserEmailChangeForm, UserPasswordChangeForm

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
def change_email(request):
    if request.method == 'POST':
        form = UserEmailChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()

            return redirect('user_profile')
    else:
        form = UserEmailChangeForm(instance=request.user)

    return render(request, 'accounts/change_email.html', {'form': form})

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