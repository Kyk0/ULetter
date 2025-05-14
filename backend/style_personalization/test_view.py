from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from style_personalization.models import Style, QuestionList

class QuestionViewTest(APITestCase):
    def setUp(self):
        self.question = QuestionList.objects.create(category="formal", question="What is your formal preference?")
        self.url = reverse('questions')

    def test_get_questions_successful(self):
        response = self.client.get(self.url, {"category": "formal"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("formal preference", response.data[0]["question"])

    def test_get_questions_invalid_category(self):
        response = self.client.get(self.url, {"category": "unknown"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class SaveStyleViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client.force_authenticate(user=self.user)
        self.url = reverse('styles_save')
        self.valid_payload = {
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
            ]
        }

    def test_save_style_successful(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("message", response.data)

    def test_save_style_invalid_data(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload["name"] = ""
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)

class DeleteStyleViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.style = Style.objects.create(
            user=self.user, name="Casual Style", category="informal"
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse('delete_style')

    def test_delete_style_successful(self):
        response = self.client.delete(self.url, {"style_id": self.style.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_style_not_found(self):
        response = self.client.delete(self.url, {"style_id": 999}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

#test were passed successfully