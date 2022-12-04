from django.contrib import admin
from .models import Source, Sitemap

# Register your models here.
admin.site.register(Sitemap)
admin.site.register(Source)