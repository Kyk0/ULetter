from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class MessageHistory(models.Model):
    request = models.TextField()
    parameters = models.JSONField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Request by {self.user.username} at {self.timestamp}"

class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="stats")
    messages_generated = models.PositiveIntegerField(default=0)
    styles_created = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Stats for {self.user.username}"


@receiver(post_save, sender=User)
def create_user_stats(sender, instance, created, **kwargs):
    if created:
        UserStats.objects.create(user=instance)