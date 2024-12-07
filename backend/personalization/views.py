# personalization/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Personalization
from .serializers import PersonalizationSerializer

class PersonalizationQuestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        questions = [
            "What is your preferred tone for messages (e.g., professional, informal, friendly)?",
            "What type of communication do you usually send (e.g., emails, letters, chat messages)?",
            "Who are the typical recipients of your messages (e.g., clients, friends, colleagues)?",
            "What level of detail do you prefer in your messages (e.g., concise, comprehensive)?",
            "Do you often include greetings and closings in your messages? If so, what style do you prefer?",
            "Are there any specific words or phrases you like to use in your communication?",
            "Do you prefer formal formatting (e.g., paragraphs, headers) or informal formatting (e.g., bullet points, emojis)?",
            "What is the typical purpose of your messages (e.g., providing updates, requesting information, persuading)?",
            "What emotional tone do you prefer to convey (e.g., optimistic, neutral, empathetic)?",
            "Are there any cultural or linguistic considerations that should be taken into account (e.g., language preferences, regional styles)?"
        ]
        return Response({"questions": questions})

class SavePersonalizationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PersonalizationSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Personalization saved successfully."})
        return Response(serializer.errors, status=400)

class SavePersonalizationView(APIView):
    permission_classes = [IsAuthenticated]  # User must be logged in

    def post(self, request):
        serializer = PersonalizationSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Personalization saved successfully."}, status=201)
        return Response(serializer.errors, status=400)