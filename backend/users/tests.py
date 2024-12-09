from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from users.models import MessageHistory
from users.serializers import SignupSerializer


class MessageHistoryModelTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        """Set up shared data for all test methods."""
        cls.user = User.objects.create_user(username="testuser", password="password123")
        cls.message = MessageHistory.objects.create(
            user=cls.user,
            request="Sample request",
            parameters={"tone": "formal", "message_type": "email"},
            response="Sample response"
        )

    def test_model_creation(self):
        """Test creation of a MessageHistory record."""
        message = MessageHistory.objects.first()
        self.assertEqual(MessageHistory.objects.count(), 1)
        self.assertEqual(message.request, "Sample request")
        self.assertEqual(message.parameters, {"tone": "formal", "message_type": "email"})
        self.assertEqual(message.response, "Sample response")
        self.assertEqual(message.user, self.user)

    def test_model_string_representation(self):
        """Test string representation of the MessageHistory model."""
        expected_str = f"Request by {self.user.username} at {self.message.timestamp}"
        self.assertEqual(str(self.message), expected_str)

    def test_message_history_parameters_format(self):
        """Test if parameters field is correctly formatted as a dictionary."""
        message = MessageHistory.objects.first()
        self.assertIsInstance(message.parameters, dict)

    def test_message_history_empty_request(self):
        """Test MessageHistory creation with empty request."""
        message = MessageHistory.objects.create(
            user=self.user,
            request="",
            parameters={"tone": "informal", "message_type": "chat"},
            response="Empty request"
        )
        self.assertEqual(message.request, "")
        self.assertEqual(message.response, "Empty request")


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

    def test_signup_serializer_invalid_email(self):
        """Test SignupSerializer with invalid email format."""
        data = {
            "username": "newuser",
            "email": "invalid-email",
            "password": "password123",
            "password_confirm": "password123",
            "first_name": "New",
            "last_name": "User"
        }
        serializer = SignupSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_signup_serializer_missing_required_fields(self):
        """Test SignupSerializer with missing required fields."""
        data = {
            "username": "newuser",
            "password": "password123",
            "password_confirm": "password123"
        }
        serializer = SignupSerializer(data=data)
        self.assertFalse(serializer.is_valid())


class UserViewTests(TestCase):
    def setUp(self):
        """Set up authenticated client for user-related tests."""
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.profile_url = '/api/users/profile/'

    def test_get_user_profile(self):
        """Test retrieving user profile."""
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], self.user.username)

    def test_patch_user_profile_partial_update(self):
        """Test partial update (PATCH) user profile."""
        data = {"first_name": "Updated"}
        response = self.client.patch(self.profile_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_delete_user_profile_not_allowed(self):
        """Test DELETE method for user profile, which is not allowed."""
        response = self.client.delete(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_access_user_profile_after_logout(self):
        """Test accessing profile after user logs out."""
        self.client.force_authenticate(user=None)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_profile_unauthenticated(self):
        """Test retrieving user profile without authentication."""
        self.client.force_authenticate(user=None)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_user_profile_update(self):
        """Test PUT method to update user profile, expecting 405 Method Not Allowed."""
        data = {"first_name": "Updated"}
        response = self.client.put(self.profile_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
