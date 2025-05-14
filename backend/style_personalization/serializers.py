from django.db import transaction
from rest_framework import serializers
from style_personalization.models import QuestionList, Style, StyleQuestions

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionList
        fields = ['id', 'category', 'question']

class StyleQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StyleQuestions
        fields = ['question', 'answer']

    def validate_question(self, value):
        if not value.strip():
            raise serializers.ValidationError("Question cannot be empty.")
        return value

    def validate_answer(self, value):
        if not value.strip():
            raise serializers.ValidationError("Answer cannot be empty.")
        return value

class StyleSerializer(serializers.ModelSerializer):
    questions = StyleQuestionSerializer(many=True)

    class Meta:
        model = Style
        fields = [
            'name', 'category', 'recipients', 'slang',
            'intentional_errors', 'detail_level', 'tone',
            'vocabulary_complexity', 'politeness_level',
            'punctuation_style', 'message_type', 'questions'
        ]

    def validate_name(self, value):
        request = self.context.get('request')
        user = request.user if request else None
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required and cannot be empty.")
        if Style.objects.filter(name=value.strip(), user=user).exists():
            raise serializers.ValidationError("A style with this name already exists.")
        return value.strip()

    def validate_category(self, value):
        if value not in ['formal', 'neutral', 'informal']:
            raise serializers.ValidationError("Category must be 'formal', 'neutral', or 'informal'.")
        return value

    def validate_recipients(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Recipients are required and cannot be empty.")
        return value

    def validate_slang(self, value):
        if not isinstance(value, bool):
            raise serializers.ValidationError("Slang must be a boolean value.")
        return value

    def validate_intentional_errors(self, value):
        if not isinstance(value, bool):
            raise serializers.ValidationError("Intentional Errors must be a boolean value.")
        return value

    def validate_detail_level(self, value):
        if value not in ['brief', 'moderate', 'elaborate']:
            raise serializers.ValidationError("Detail Level must be 'brief', 'moderate', or 'elaborate'.")
        return value

    def validate_tone(self, value):
        if value not in ['polite', 'friendly', 'serious', 'playful']:
            raise serializers.ValidationError("Tone must be 'polite', 'friendly', 'serious', or 'playful'.")
        return value

    def validate_vocabulary_complexity(self, value):
        if value not in ['simple', 'moderate', 'advanced']:
            raise serializers.ValidationError("Vocabulary Complexity must be 'simple', 'moderate', or 'advanced'.")
        return value

    def validate_politeness_level(self, value):
        if value not in ['low', 'moderate', 'high']:
            raise serializers.ValidationError("Politeness Level must be 'low', 'moderate', or 'high'.")
        return value

    def validate_punctuation_style(self, value):
        if value not in ['formal', 'casual']:
            raise serializers.ValidationError("Punctuation Style must be 'formal' or 'casual'.")
        return value

    def validate_message_type(self, value):
        if value not in ['chat', 'email']:
            raise serializers.ValidationError("Message Type must be 'chat' or 'email'.")
        return value

    def validate(self, data):
        if not data.get('name'):
            raise serializers.ValidationError({"name": "Name is required."})
        if not data.get('recipients'):
            raise serializers.ValidationError({"recipients": "Recipients are required."})
        if not data.get('questions') or len(data.get('questions')) == 0:
            raise serializers.ValidationError({"questions": "At least one question is required."})
        return data

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        user = self.context['request'].user
        with transaction.atomic():
            style = Style.objects.create(user=user, **validated_data)
            StyleQuestions.objects.bulk_create([
                StyleQuestions(style=style, **question_data) for question_data in questions_data
            ])
        return style
