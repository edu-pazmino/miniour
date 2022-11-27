from django.template import loader
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from .models import Question, Choice
from django.db.models import F
from django.views import generic
from django.utils import timezone


class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "questions"

    def get_queryset(self):
        """
        Return the last five published questions (not including those set to be
        published in the future).
        """
        return Question.objects.filter(created_at__lte=timezone.now()).order_by(
            "-created_at"
        )[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name: str = "polls/detail.html"

    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(created_at__lte=timezone.now())


class ResultsView(generic.DetailView):
    model = Question
    template_name: str = "polls/results.html"


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

    return render(request, "polls/detail.html", context={"question": question})


def results(request, question_id: int):
    question = get_object_or_404(Question, pk=question_id)

    return render(request, "polls/results.html", {"question": question})


def vote(request, question_id: int):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        return render(
            request,
            "polls/detail.html",
            {"question": question, "error_message": "You didn't select a choice."},
        )
    else:
        # to avoid race condition https://docs.djangoproject.com/en/4.1/ref/models/expressions/#avoiding-race-conditions-using-f
        selected_choice.votes = F("votes") + 1
        selected_choice.save()
        return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
