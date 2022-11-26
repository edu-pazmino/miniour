from django.template import loader
from django.http import Http404, HttpResponse
from django.shortcuts import render
from .models import Question

# Create your views here.
def index(request):
    questions = Question.objects.order_by("-created_at")[:10]
    template = loader.get_template("polls/index.html")
    context = {"questions": questions}

    return HttpResponse(template.render(context, request))


def detail(request, question_id: int):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question doesn't exists")

    return render(request, "polls/detail.html", context={'question': question})


def results(request, question_id: int):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id: int):
    return HttpResponse("You're voting on question %s." % question_id)
