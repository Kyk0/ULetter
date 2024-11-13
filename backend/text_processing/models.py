from django.db import models

# Create your models here.
class Message(models.Model):
    user = models.CharField(max_length=200)
    prompt = models.TextField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add = True)


def __str__ (self):
    return f"{self.user}: , {self.promt}: , {self.response}: , {self.timestamp}: "