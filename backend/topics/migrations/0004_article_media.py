# Generated by Django 4.1.3 on 2022-11-27 19:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("topics", "0003_mediatype_rename_news_article_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="article",
            name="media",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="topics.media",
            ),
        ),
    ]
