from django.test import TestCase
from django.contrib.auth.models import User
from personalization.models import Personalization


class PersonalizationModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.personalization = Personalization.objects.create(
            user=self.user,
            question_1="professional",
            question_2="email",
            question_3="clients",
            question_4="concise",
            question_5="formal",
            question_6="preferred phrases",
            question_7="formal",
            question_8="updates",
            question_9="neutral",
            question_10="American",
        )

    def test_personalization_creation(self):
        self.assertEqual(self.personalization.user.username, "testuser")
        self.assertEqual(self.personalization.question_1, "professional")

    def test_personalization_str_method(self):
        self.assertEqual(str(self.personalization), "Personalization for testuser")
#tests were passed successfully