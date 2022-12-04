from django.urls import path

from . import views

app_name = "topics"

urlpatterns = [
    # /topics/
    path("", views.IndexView.as_view(), name="index"),
]
