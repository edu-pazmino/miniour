# Generated by Django 4.1.3 on 2022-11-27 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("topics", "0008_remove_media_url_media_content"),
    ]

    operations = [
        migrations.AlterField(
            model_name="media",
            name="content",
            field=models.TextField(),
        ),
    ]
