from django.db import models

class Blog(models.Model):
    title = models.CharField(max_length=200)
    tag = models.CharField(max_length=50)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)
    read_time = models.CharField(max_length=20, default='5 min read')
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    def __str__(self):
        return self.title