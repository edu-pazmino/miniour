from typing import Sequence, Type
from django.contrib import admin

from .models import Choice, Question


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 1


class QuestionAdmin(admin.ModelAdmin):
    search_fields: Sequence[str] = ['content']
    list_display = ('content', 'created_at', 'was_published_recently')
    list_filter = ['created_at']
    fieldsets = [
        (
            None,
            {
                "fields": ["content"],
            },
        ),
        ("Date information", {"fields": ["created_at"], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]


# Register your models here.
admin.site.register(Question, QuestionAdmin)
