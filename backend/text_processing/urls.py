from django.urls import path
from . import views

urlpatterns = [
    path('api/process-message/', views.process_message, name='process_message'),
]