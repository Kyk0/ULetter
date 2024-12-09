from django.test import TestCase
from personalization.serializers import PersonalizationSerializer
from personalization.models import Personalization
from django.contrib.auth.models import User


class PersonalizationSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.valid_payload = {
            "question_1": "professional",
            "question_2": "email",
            "question_3": "clients",
            "question_4": "concise",
            "question_5": "formal",
            "question_6": "preferred phrases",
            "question_7": "formal",
            "question_8": "updates",
            "question_9": "neutral",
            "question_10": "American",
        }
        self.invalid_payload = {
            "question_1": "invalid-tone",
            "question_2": "unknown-type",
        }

    def test_valid_serializer(self):
        serializer = PersonalizationSerializer(data=self.valid_payload)
        self.assertTrue(serializer.is_valid())

    def test_invalid_serializer(self):
        serializer = PersonalizationSerializer(data=self.invalid_payload)
        self.assertFalse(serializer.is_valid())
        self.assertIn("question_1", serializer.errors)
        self.assertIn("question_2", serializer.errors)

#tests were passed successfully