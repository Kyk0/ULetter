from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from personalization.models import Personalization


class PersonalizationQuestionsViewTest(APITestCase):
    def setUp(self):
        self.url = reverse('personalization-questions')
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client.force_authenticate(user=self.user)

    def test_get_personalization_questions(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("questions", response.data)


class SavePersonalizationViewTest(APITestCase):
    def setUp(self):
        self.url = reverse('save-personalization')
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client.force_authenticate(user=self.user)
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
        }

    def test_save_personalization_success(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Personalization.objects.count(), 1)

    def test_save_personalization_invalid(self):
        response = self.client.post(self.url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("question_1", response.data)

        #tests were passed successfully
