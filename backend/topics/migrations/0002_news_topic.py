# Generated by Django 4.1.3 on 2022-11-27 18:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("topics", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="news",
            name="topic",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="topics.topic",
            ),
        ),
    ]
