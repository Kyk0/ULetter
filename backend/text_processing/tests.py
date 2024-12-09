from unittest.mock import patch
from django.test import TestCase
from rest_framework.test import APIClient, APIRequestFactory
from rest_framework import status
from django.contrib.auth.models import User
from text_processing.serializers import EditMessageSerializer
from text_processing.openai_helper import OpenAIHelper


class EditMessageSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")

    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_valid_serializer(self, mock_openai_call):
        """Test serializer with valid data."""
        mock_openai_call.return_value = "Mocked API response"
        data = {
            "request": "Test request",
            "parameters": {"tone": "formal", "message_type": "email"}
        }
        factory = APIRequestFactory()
        request = factory.post('/api/text-processing/edit-message/', data, format='json')
        request.user = self.user

        serializer = EditMessageSerializer(data=data, context={"request": request})
        self.assertTrue(serializer.is_valid())
        instance = serializer.save()
        self.assertEqual(instance.request, "Test request")
        self.assertEqual(instance.parameters, data["parameters"])
        self.assertEqual(instance.response, "Mocked API response")
        self.assertEqual(instance.user, self.user)

    def test_invalid_serializer_missing_parameters(self):
        """Test serializer with missing parameters."""
        data = {"request": "Test request"}
        serializer = EditMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("parameters", serializer.errors)

    def test_invalid_serializer_empty_request(self):
        """Test serializer with empty request."""
        data = {"request": "", "parameters": {"tone": "formal", "message_type": "email"}}
        serializer = EditMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("request", serializer.errors)

    def test_serializer_invalid_non_json_parameters(self):
        """Test serializer with non-JSON parameters."""
        data = {"request": "Valid request", "parameters": "Non-JSON string"}
        serializer = EditMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("parameters", serializer.errors)

    def test_invalid_serializer_missing_request(self):
        """Test serializer with missing request."""
        data = {"parameters": {"tone": "formal", "message_type": "email"}}
        serializer = EditMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("request", serializer.errors)

    def test_invalid_serializer_invalid_parameters_structure(self):
        """Test serializer with invalid structure for parameters."""
        data = {"request": "Test request", "parameters": "invalid_structure"}
        serializer = EditMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("parameters", serializer.errors)

    def test_invalid_serializer_empty_parameters_field(self):
        """Test serializer with an empty 'parameters' field."""
        data = {"request": "Test request", "parameters": {}}
        serializer = EditMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("parameters", serializer.errors)


class OpenAIHelperTests(TestCase):
    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_call_success(self, mock_api_call):
        """Test successful OpenAI API call."""
        mock_api_call.return_value = "Mocked API response"
        response = OpenAIHelper.chatgpt_api_call("Test request", {"tone": "formal"})
        self.assertEqual(response, "Mocked API response")

    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_call_invalid_parameters(self, mock_api_call):
        """Test OpenAI API call with invalid parameters."""
        mock_api_call.side_effect = ValueError("Invalid parameters")
        with self.assertRaises(ValueError):
            OpenAIHelper.chatgpt_api_call("Test request", {"invalid_key": "value"})

    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_call_runtime_error(self, mock_api_call):
        """Test OpenAI API call with runtime error."""
        mock_api_call.side_effect = RuntimeError("API error")
        with self.assertRaises(RuntimeError):
            OpenAIHelper.chatgpt_api_call("Test request", {"tone": "formal"})
            
    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_large_payload(self, mock_api_call):
        """Test OpenAI API with a large payload."""
        large_payload = {f"key_{i}": f"value_{i}" for i in range(1000)}
        mock_api_call.return_value = "Mocked large payload response"
        response = OpenAIHelper.chatgpt_api_call("Large request", large_payload)
        self.assertEqual(response, "Mocked large payload response")

    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_call_empty_request(self, mock_api_call):
        """Test OpenAI API with an empty request."""
        mock_api_call.side_effect = ValueError("Request cannot be empty")
        with self.assertRaises(ValueError):
            OpenAIHelper.chatgpt_api_call("", {"tone": "formal"})

    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_call_empty_parameters(self, mock_api_call):
        """Test OpenAI API with empty parameters."""
        mock_api_call.side_effect = ValueError("Parameters cannot be empty")
        with self.assertRaises(ValueError):
            OpenAIHelper.chatgpt_api_call("Valid request", {})

    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_call_connection_error(self, mock_api_call):
        """Test OpenAI API call with connection error."""
        mock_api_call.side_effect = ConnectionError("Failed to connect")
        with self.assertRaises(ConnectionError):
            OpenAIHelper.chatgpt_api_call("Test request", {"tone": "formal"})
    
    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_call_timeout_error(self, mock_api_call):
        """Test OpenAI API call with timeout error."""
        mock_api_call.side_effect = TimeoutError("Request timed out")
        with self.assertRaises(TimeoutError):
            OpenAIHelper.chatgpt_api_call("Test request", {"tone": "formal"})

    @patch("text_processing.openai_helper.OpenAIHelper.chatgpt_api_call")
    def test_chatgpt_api_call_unexpected_error(self, mock_api_call):
        """Test OpenAI API with an unexpected error."""
        mock_api_call.side_effect = Exception("Unexpected error")
        with self.assertRaises(Exception):
            OpenAIHelper.chatgpt_api_call("Test request", {"tone": "formal"})


class EditMessageViewTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = '/api/text-processing/edit-message/'

    @patch("text_processing.serializers.OpenAIHelper.chatgpt_api_call")
    def test_create_message_success(self, mock_openai_call):
        """Test successful record creation via API."""
        mock_openai_call.return_value = "Mocked API response"
        data = {"request": "Test request", "parameters": {"tone": "formal", "message_type": "email"}}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)
        self.assertEqual(response.data["request"], data["request"])
        self.assertEqual(response.data["parameters"], data["parameters"])

    def test_create_message_unauthorized(self):
        """Test unauthorized request."""
        self.client.force_authenticate(user=None)
        data = {"request": "Test request", "parameters": {"tone": "formal", "message_type": "email"}}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_message_invalid_parameters(self):
        """Test API with invalid parameters."""
        data = {"request": "Test request", "parameters": {"invalid_key": "value"}}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("parameters", response.data)

    def test_create_message_empty_request(self):
        """Test API with empty request."""
        data = {"request": "", "parameters": {"tone": "formal", "message_type": "email"}}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("request", response.data)

    def test_create_message_empty_parameters(self):
        """Test API with empty parameters."""
        data = {"request": "Valid request", "parameters": {}}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("parameters", response.data)

    def test_create_message_get_method(self):
        """Test GET request on the create message endpoint."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_create_message_put_method(self):
        """Test PUT request on the create message endpoint (which should not be allowed)."""
        data = {"request": "Updated request", "parameters": {"tone": "informal"}}
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_create_message_missing_authentication(self):
        """Test API with missing authentication token."""
        self.client.force_authenticate(user=None)
        data = {"request": "Test request", "parameters": {"tone": "formal", "message_type": "email"}}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
