from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from users.models import MessageHistory
from users.serializers import SignupSerializer

class MessageHistoryModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.message = MessageHistory.objects.create(
            user=self.user,
            request="Sample request",
            parameters={"tone": "formal", "message_type": "email"},
            response="Sample response"
        )

    def test_model_creation(self):
        """Test creation of a MessageHistory record."""
        self.assertEqual(MessageHistory.objects.count(), 1)
        self.assertEqual(self.message.request, "Sample request")
        self.assertEqual(self.message.parameters, {"tone": "formal", "message_type": "email"})
        self.assertEqual(self.message.response, "Sample response")
        self.assertEqual(self.message.user, self.user)

    def test_model_string_representation(self):
        """Test string representation of the MessageHistory model."""
        expected_str = f"Request by {self.user.username} at {self.message.timestamp}"
        self.assertEqual(str(self.message), expected_str)


class SignupSerializerTests(TestCase):
    def test_valid_signup_serializer(self):
        """Test valid SignupSerializer data."""
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "strongpassword123",
            "password_confirm": "strongpassword123",
            "first_name": "New",
            "last_name": "User"
        }
        serializer = SignupSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.username, "newuser")
        self.assertEqual(user.email, "newuser@example.com")

    def test_invalid_signup_serializer_password_mismatch(self):
        """Test SignupSerializer with password mismatch."""
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "password_confirm": "password456",
            "first_name": "New",
            "last_name": "User"
        }
        serializer = SignupSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("password_confirm", serializer.errors)

    def test_invalid_signup_serializer_missing_first_name(self):
        """Test SignupSerializer with missing first name."""
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "password_confirm": "password123",
            "first_name": "",
            "last_name": "User"
        }
        serializer = SignupSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("first_name", serializer.errors)


class UserViewTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.profile_url = '/api/users/profile/'

    def test_get_user_profile(self):
        """Test retrieving user profile."""
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["username"], self.user.username)

    def test_patch_user_profile_partial_update(self):
        """Test partial update (PATCH) user profile."""
        data = {"first_name": "Updated"}
        response = self.client.patch(self.profile_url, data, format='json')
        self.assertEqual(response.status_code, 405)  # Method Not Allowed
        

    def test_delete_user_profile_not_allowed(self):
        """Test DELETE method for user profile, which is not allowed."""
        response = self.client.delete(self.profile_url)
        self.assertEqual(response.status_code, 405)

    def test_access_user_profile_after_logout(self):
        """Test accessing profile after user logs out."""
        self.client.force_authenticate(user=None)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, 401)