from django.db import models


class Source(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField()


class Sitemap(models.Model):
    description = models.CharField(max_length=200)
    url = models.URLField()
    priority = models.FloatField()
    frequency = models.CharField(max_length=45)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
