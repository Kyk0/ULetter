import random

from django.db import transaction
from django.shortcuts import get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from style_personalization.models import QuestionList, Style
from style_personalization.serializers import StyleSerializer, QuestionSerializer
from users.models import UserStats


class QuestionView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    VALID_CATEGORIES = ['formal', 'neutral', 'informal']

    def get(self, request):
        category = request.query_params.get('category')

        if category not in self.VALID_CATEGORIES:
            return Response({'error': 'Invalid category'}, status=status.HTTP_400_BAD_REQUEST)

        questions = get_list_or_404(QuestionList, category=category)

        random_questions = random.sample(list(questions), min(5, len(questions)))

        serializer = QuestionSerializer(random_questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SaveStyleView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = StyleSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    style = serializer.save()
                    stats, created = UserStats.objects.get_or_create(user=request.user)
                    stats.styles_created += 1
                    stats.save()

                return Response({"message": "Style created successfully."}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import transaction
from .models import Style

class DeleteStyleView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        style_name = request.data.get('name')
        if not style_name:
            return Response({"error": "Style name is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                style = Style.objects.get(name=style_name, user=request.user)

                style.delete()

                return Response({"message": "Style deleted successfully."}, status=status.HTTP_200_OK)
        except Style.DoesNotExist:
            return Response({"error": "Style not found or not owned by the user."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListStylesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        styles = Style.objects.filter(user=request.user)
        serializer = StyleSerializer(styles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
