from django.test import TestCase
from style_personalization.serializers import StyleSerializer
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
                {"question": "What is your tone preference?", "answer": "Friendly"},
                {"question": "Do you prefer slang?", "answer": "Yes"}
            ]
        }

    def test_valid_serializer(self):
        serializer = StyleSerializer(data=self.valid_data, context={'request': self.user})
        self.assertTrue(serializer.is_valid())
        self.assertEqual(len(serializer.validated_data["questions"]), 2)

    def test_invalid_serializer(self):
        invalid_data = self.valid_data.copy()
        invalid_data["category"] = "unknown"
        serializer = StyleSerializer(data=invalid_data, context={'request': self.user})
        self.assertFalse(serializer.is_valid())
        self.assertIn("category", serializer.errors)

#tests were passed successfully