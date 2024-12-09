from rest_framework.exceptions import ValidationError
from django.test import TestCase
from style_personalization.serializers import (
    StyleSerializer,
    StyleQuestionSerializer,
    QuestionSerializer,
)
from style_personalization.models import Style, StyleQuestions, QuestionList
from django.contrib.auth.models import User


class StyleSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.valid_data = {
            "name": "Casual Style",
            "category": "informal",
            "recipients": "Friends",
            "slang": True,
            "intentional_errors": False,
            "detail_level": "brief",
            "tone": "friendly",
            "vocabulary_complexity": "simple",
            "politeness_level": "low",
            "punctuation_style": "casual",
            "message_type": "chat",
            "questions": [
                {"question": "What is your tone preference?", "answer": "Friendly"}
            ],
        }

    def test_style_serializer_valid_data(self):
        serializer = StyleSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())

    def test_style_serializer_invalid_data(self):
        invalid_data = self.valid_data.copy()
        invalid_data["name"] = ""
        serializer = StyleSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)

    def test_style_serializer_missing_questions(self):
        invalid_data = self.valid_data.copy()
        invalid_data["questions"] = []
        serializer = StyleSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("questions", serializer.errors)


class StyleQuestionSerializerTest(TestCase):
    def setUp(self):
        self.valid_data = {"question": "What is your preference?", "answer": "Friendly"}

    def test_style_question_serializer_valid_data(self):
        serializer = StyleQuestionSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())

    def test_style_question_serializer_empty_question(self):
        invalid_data = self.valid_data.copy()
        invalid_data["question"] = ""
        serializer = StyleQuestionSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("question", serializer.errors)

    def test_style_question_serializer_empty_answer(self):
        invalid_data = self.valid_data.copy()
        invalid_data["answer"] = ""
        serializer = StyleQuestionSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("answer", serializer.errors)
