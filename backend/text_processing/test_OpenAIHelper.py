from django.test import TestCase
from text_processing.openai_helper import OpenAIHelper

class OpenAIHelperTest(TestCase):
    def test_generate_system_content_valid(self):
        content = OpenAIHelper.generate_system_content("professional", "email", "edit")
        self.assertIn("formal", content)
        self.assertIn("email", content)

    def test_generate_system_content_invalid(self):
        with self.assertRaises(ValueError):
            OpenAIHelper.generate_system_content("invalid-tone", "email", "edit")

##successful passed