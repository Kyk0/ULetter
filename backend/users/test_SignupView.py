from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User


class SignupViewTest(APITestCase):
    def setUp(self):
        self.url = reverse('signup')
        self.valid_payload = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "password123",
            "password_confirm": "password123",
            "first_name": "Test",
            "last_name": "User"
        }
        self.invalid_payload = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "password123",
            "password_confirm": "wrongpassword",
            "first_name": "Test",
            "last_name": "User"
        }

    def test_user_registration_successful(self):
        response = self.client.post(self.url, self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_user_registration_password_mismatch(self):
        response = self.client.post(self.url, self.invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password_confirm", response.data)

#the results were successful

#Found 2 test(s).
#Creating test database for alias 'default'...
#System check identified no issues (0 silenced).
#..
#----------------------------------------------------------------------
#Ran 2 tests in 0.271s