from rest_framework import status
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import EditMessageSerializer
from personalization.models import Personalization


class EditMessageView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        personalization = Personalization.objects.filter(user=user).first()

        if personalization:
            personalization_data = {
                "question_1": personalization.question_1,
                "question_2": personalization.question_2,
                "question_3": personalization.question_3,
                "question_4": personalization.question_4,
                "question_5": personalization.question_5,
                "question_6": personalization.question_6,
                "question_7": personalization.question_7,
                "question_8": personalization.question_8,
                "question_9": personalization.question_9,
                "question_10": personalization.question_10,
            }
            # Pass personalization data to the serializer.
        else:
            personalization_data = {}

        serializer = EditMessageSerializer(
            data=request.data,
            context={'request': request, 'personalization': personalization_data}
        )
        if serializer.is_valid():
            instance = serializer.save()
            return Response({
                'id': instance.id,
                'request': instance.request,
                'parameters': instance.parameters,
                'response': instance.response,
                'timestamp': instance.timestamp,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


