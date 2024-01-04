from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.views.generic.edit import FormView
from django.contrib.auth import login
from django.urls import reverse_lazy

class RegistrationView(FormView):
    template_name = 'registration/register.html'
    form_class = UserCreationForm
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)

class LoginView(FormView):
    template_name = 'registration/login.html'
    form_class = AuthenticationForm
    success_url = 'core/base.html'  # Замените '/' на URL, на который вы хотите перейти после успешного входа

    def form_valid(self, form):
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = form.get_user()
        login(self.request, user)
        return super().form_valid(form)