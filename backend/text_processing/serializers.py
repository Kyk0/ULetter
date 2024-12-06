# serializers.py
from rest_framework import serializers
from users.models import MessageHistory
from .openai_helper import OpenAIHelper

class EditMessageSerializer(serializers.ModelSerializer):
    request = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    parameters = serializers.JSONField(required=True, allow_null=False)

    class Meta:
        model = MessageHistory
        fields = ('request', 'parameters')

    def validate(self, attrs):
        try:
            parameters_dict = dict(attrs['parameters'])
            response = OpenAIHelper.chatgpt_api_call(attrs['request'], parameters_dict)
            attrs['response'] = response
        except ValueError as ve:
            raise serializers.ValidationError({"parameters": str(ve)})
        except RuntimeError as re:
            raise serializers.ValidationError({"response": str(re)})
        except Exception as e:
            raise serializers.ValidationError({"response": f"Unexpected error: {str(e)}"})
        return attrs

    def create(self, validated_data):
        user = self.context.get('request').user
        return MessageHistory.objects.create(
            request=validated_data['request'],
            parameters=validated_data['parameters'],
            response=validated_data['response'],
            user=user
        )
