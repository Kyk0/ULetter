from django.db import models
from django.contrib.auth.models import User

class QuestionList(models.Model):
    category = models.CharField(max_length=50)
    question = models.TextField()

    def __str__(self):
        return f"{self.category}: {self.question[:50]}"


class Style(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='styles')
    name = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(
        max_length=50,
        choices=[('formal', 'Formal'), ('neutral', 'Neutral'), ('informal', 'Informal')],
        blank=True,
        null=True
    )
    recipients = models.CharField(max_length=255, blank=True, null=True)
    slang = models.BooleanField(default=False, blank=True, null=True)
    intentional_errors = models.BooleanField(default=False, blank=True, null=True)
    detail_level = models.CharField(
        max_length=50,
        choices=[('brief', 'Brief'), ('moderate', 'Moderate'), ('elaborate', 'Elaborate')],
        blank=True,
        null=True
    )
    tone = models.CharField(
        max_length=50,
        choices=[('polite', 'Polite'), ('friendly', 'Friendly'), ('serious', 'Serious'), ('playful', 'Playful')],
        blank=True,
        null=True
    )
    vocabulary_complexity = models.CharField(
        max_length=50,
        choices=[('simple', 'Simple'), ('moderate', 'Moderate'), ('advanced', 'Advanced')],
        blank=True,
        null=True
    )
    politeness_level = models.CharField(
        max_length=50,
        choices=[('low', 'Low'), ('moderate', 'Moderate'), ('high', 'High')],
        blank=True,
        null=True
    )
    punctuation_style = models.CharField(
        max_length=50,
        choices=[('formal', 'Formal'), ('casual', 'Casual')],
        blank=True,
        null=True
    )
    message_type = models.CharField(
        max_length=50,
        choices=[('chat', 'Chat'), ('email', 'Email')],
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name or f"Style {self.id}"

class StyleQuestions(models.Model):
    style = models.ForeignKey(Style, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return f"Question for style {self.style.name or self.style.id}"