from django.shortcuts import render
from .models import Blog

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