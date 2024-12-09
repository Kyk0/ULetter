from django.test import TestCase
from django.contrib.auth.models import User
from style_personalization.models import Style, QuestionList, StyleQuestions

class StyleModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.style = Style.objects.create(
            user=self.user,
            name="Casual Style",
            category="informal",
            detail_level="brief",
            tone="friendly",
            vocabulary_complexity="simple"
        )

    def test_style_creation(self):
        self.assertEqual(self.style.name, "Casual Style")
        self.assertEqual(self.style.category, "informal")

    def test_style_str_method(self):
        self.assertEqual(str(self.style), "Casual Style")

class QuestionListModelTest(TestCase):
    def setUp(self):
        self.question = QuestionList.objects.create(category="formal", question="What is your formal preference?")

    def test_question_creation(self):
        self.assertEqual(self.question.category, "formal")
        self.assertIn("formal preference", str(self.question))

#tests were passed successfully