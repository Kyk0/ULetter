from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from unittest.mock import patch
from text_processing.models import MessageHistory
from users.models import UserStats



class GenerateMessageViewTest(APITestCase):
    def setUp(self):
        self.url = reverse('chat-gpt-call')
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client.force_authenticate(user=self.user)
        self.valid_payload = {
            "request": "Write a professional email",
            "parameters": {"tone": "formal", "type": "email"}
        }
        self.invalid_payload = {
            "parameters": {"tone": "formal"}
        }


    def test_generate_message_unauthenticated(self):
        self.client.logout()
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch("text_processing.chatgpt.call_custom_assistant")
    def test_generate_message_unexpected_error(self, mock_call):
        mock_call.side_effect = Exception("Mocked exception")
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn("error", response.data)
