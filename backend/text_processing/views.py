from rest_framework import status
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import EditMessageSerializer

class EditMessageView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EditMessageSerializer(data=request.data, context={'request': request})
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


