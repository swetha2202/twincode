from django.shortcuts import render
from .models import Blog
from django.http import HttpResponse
from django.contrib.auth.models import User

def home(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def services(request):
    return render(request, 'services.html')

def blogs(request):
    blogs = Blog.objects.all().order_by('-date')
    return render(request, 'blogs.html', {'blogs': blogs})

def contact(request):
    return render(request, 'contact.html')

def create_admin(request):
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@twincode.com', 'admin123')
        return HttpResponse('Superuser created!')
    return HttpResponse('Already exists!')