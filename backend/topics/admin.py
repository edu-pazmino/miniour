from django.contrib import admin
from .models import Topic, Article, ArticleSource, Media, MediaType

# Register your models here.
admin.site.register(Topic)
admin.site.register(ArticleSource)
admin.site.register(Article)
admin.site.register(MediaType)
admin.site.register(Media)