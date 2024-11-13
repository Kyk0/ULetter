from django.urls import path
from . import views

urlpatterns = [
    path('api/process-message/', views.process_message, name='process_message'),
    path('api/message_store/', views.get_message_storage, name='message_store'),
]