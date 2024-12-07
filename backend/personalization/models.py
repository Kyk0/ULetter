from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Personalization(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    question_1 = models.CharField(max_length=255, blank=True)
    question_2 = models.CharField(max_length=255, blank=True)
    question_3 = models.CharField(max_length=255, blank=True)
    question_4 = models.CharField(max_length=255, blank=True)
    question_5 = models.CharField(max_length=255, blank=True)
    question_6 = models.CharField(max_length=255, blank=True)
    question_7 = models.CharField(max_length=255, blank=True)
    question_8 = models.CharField(max_length=255, blank=True)
    question_9 = models.CharField(max_length=255, blank=True)
    question_10 = models.CharField(max_length=255, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Personalization for {self.user.username}"


