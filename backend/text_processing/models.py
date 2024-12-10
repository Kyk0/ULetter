from django.db import models
from django.contrib.auth.models import User

class MessageHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='message_histories')
    request = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"MessageHistory for {self.user.username} at {self.created_at}"
