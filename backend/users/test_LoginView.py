from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User

class LoginViewTest(APITestCase):
    def setUp(self):
        self.url = reverse('login')
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="password123"
        )
        self.valid_payload = {
            "username": "testuser",
            "password": "password123"
        }
        self.invalid_payload = {
            "username": "testuser",
            "password": "wrongpassword"
        }

    def test_user_login_successful(self):
        response = self.client.post(self.url, self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_user_login_invalid_credentials(self):
        response = self.client.post(self.url, self.invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

#successful passed 2 test