from rest_framework import serializers
from .models import EditMessageHistory
from .openai_helper import chatgpt_api_call

class EditMessageSerializer(serializers.ModelSerializer):
    request = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    parameters = serializers.JSONField(required=True, allow_null=False)

    class Meta:
        model = EditMessageHistory
        fields = ('request', 'parameters')

    def validate(self, attrs):
        try:
            parameters_dict = dict(attrs['parameters'])
            response = chatgpt_api_call(attrs['request'], parameters_dict)
            attrs['response'] = response
        except Exception as e:
            raise serializers.ValidationError({"response": f"ChatGPT API call failed: {str(e)}"})
        return attrs

    def create(self, validated_data):
        user = self.context.get('request').user
        return EditMessageHistory.objects.create(
            request=validated_data['request'],
            parameters=validated_data['parameters'],
            response=validated_data['response'],
            user=user
        )