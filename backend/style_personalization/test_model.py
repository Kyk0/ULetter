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
            vocabulary_complexity="simple",
        )

    def test_style_creation(self):
        self.assertEqual(self.style.name, "Casual Style")
        self.assertEqual(self.style.category, "informal")

    def test_style_str_method(self):
        self.assertEqual(str(self.style), "Casual Style")


class QuestionListModelTest(TestCase):
    def setUp(self):
        self.question_list = QuestionList.objects.create(
            category="formal", question="What is your formal preference?"
        )

    def test_question_list_creation(self):
        self.assertEqual(self.question_list.category, "formal")
        self.assertEqual(self.question_list.question, "What is your formal preference?")

    def test_question_list_str_method(self):
        self.assertIn("formal", str(self.question_list))


class StyleQuestionsModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.style = Style.objects.create(
            user=self.user,
            name="Casual Style",
            category="informal",
        )
        self.style_question = StyleQuestions.objects.create(
            style=self.style, question="What is your tone preference?", answer="Friendly"
        )

    def test_style_question_creation(self):
        self.assertEqual(self.style_question.question, "What is your tone preference?")
        self.assertEqual(self.style_question.answer, "Friendly")
        self.assertEqual(self.style_question.style, self.style)

    def test_style_question_str_method(self):
        self.assertIn("Casual Style", str(self.style_question))

#test were passed successfully