from django.urls import path
from style_personalization.views import QuestionView, SaveStyleView, DeleteStyleView

urlpatterns = [
    path('questions/', QuestionView.as_view(), name='questions'),
    path('styles/save/', SaveStyleView.as_view(), name='styles_save' ),
    path('styles/delete/', DeleteStyleView.as_view(), name='delete_style'),
]