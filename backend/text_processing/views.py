from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from text_processing.chatgpt import call_custom_assistant
from text_processing.serializers import ChatRequestSerializer
from users.models import MessageHistory, UserStats


class GenerateMessageView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            try:
                validated_data = serializer.validated_data
                chatgpt_response = call_custom_assistant(validated_data)

                user = request.user
                with transaction.atomic():
                    MessageHistory.objects.create(
                        user=user,
                        request=validated_data.get("request", ""),
                        parameters=validated_data,
                        response=chatgpt_response
                    )

                    stats, created = UserStats.objects.get_or_create(user=user)
                    stats.messages_generated += 1
                    stats.save()

                return Response({"response": chatgpt_response}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(
                    {"error": f"An unexpected error occurred: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )