from django.urls import path

from text_processing.views import GenerateMessageView

urlpatterns = [
    path('chat-gpt/call/', GenerateMessageView.as_view() , name='chat-gpt-call'),
]