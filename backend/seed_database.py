import os
import django
import json

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ULetter.settings')  # Replace with your project's settings module
django.setup()

from style_personalization.models import Question


file_path = 'seed_questions.json'

with open(file_path, 'r') as file:
    questions = json.load(file)

for question in questions:
    Question.objects.create(
        category=question['category'],
        question=question['question']
    )

print("Database seeded successfully!")