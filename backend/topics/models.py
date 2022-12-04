from django.db import models

# Create your models here.
class Topic(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title


class ArticleSource(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class MediaType(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name


class Media(models.Model):
    content = models.TextField()
    media_type = models.ForeignKey(MediaType, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return "(media: %s) url: %s" % (self.media_type.name, self.content)


class Article(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=2000, blank=True, default='')
    news_source = models.ForeignKey(ArticleSource, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    media = models.ForeignKey(Media, on_delete=models.CASCADE)
    source_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title
