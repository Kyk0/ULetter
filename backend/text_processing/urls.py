from django.urls import path
from .views import EditMessageView

urlpatterns = [
    path('edit-message/', EditMessageView.as_view() , name='process_message'),
]