from django.urls import path
from . import views
from .views import SavePersonalizationView, PersonalizationQuestionsView

urlpatterns = [
    path('questions/', PersonalizationQuestionsView.as_view(), name='personalization-questions'),
    path('save/', SavePersonalizationView.as_view(), name='save-personalization'),
]
