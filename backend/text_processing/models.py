from django.db import models
from django.contrib.auth.models import User


class EditMessageHistory(models.Model):
    request = models.TextField()
    parameters = models.JSONField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Request by {self.user.username} at {self.timestamp}"