import datetime
from django.db import models
from django.utils import timezone

# Create your models here.
class Question(models.Model):
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField("data published")

    def was_published_recently(self):
        now = timezone.now()
        return  now - datetime.timedelta(days=1) <= self.created_at <= now 

    def __str__(self) -> str:
        return self.content


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.content
