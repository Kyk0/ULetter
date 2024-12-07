from rest_framework import serializers
from .models import Personalization

VALID_TONES = [
    "professional", "informal", "friendly",
    "semi-formal", "casual", "serious", "humorous",
    "optimistic", "neutral", "empathetic", "aggressive"
]
VALID_COMMUNICATION_TYPES = [
    "email", "letter", "chat",
    "memo", "presentation", "report"
]

VALID_RECIPIENTS = [
    "clients", "friends", "colleagues",
    "managers", "team", "family"
]

VALID_LEVELS_OF_DETAIL = [
    "concise", "comprehensive", "moderate",
    "detailed", "brief"
]

VALID_GREETINGS = [
    "formal", "informal", "friendly", "none"
]

VALID_FORMATTING_STYLES = [
    "formal", "casual", "bullet points",
    "headers", "emojis"
]

VALID_PURPOSES = [
    "updates", "information", "persuasion",
    "appreciation", "requests", "feedback"
]

VALID_EMOTIONAL_TONES = [
    "optimistic", "neutral", "empathetic",
    "assertive", "encouraging", "serious",
    "aggressive"
]

VALID_CULTURAL_STYLES = [
    "American", "British", "Canadian",
    "Australian", "formal", "casual"
]




class PersonalizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personalization
        exclude = ['user']

    def validate_question_1(self, value):
        if value.lower() not in VALID_TONES:
            raise serializers.ValidationError(
                f"Invalid tone. Choose from: {', '.join(VALID_TONES)}."
            )
        return value

    def validate_question_2(self, value):
        if value.lower() not in VALID_COMMUNICATION_TYPES:
            raise serializers.ValidationError(
                f"Invalid communication type. Choose from: {', '.join(VALID_COMMUNICATION_TYPES)}."
            )
        return value

    def validate_question_3(self, value):
        if value.lower() not in VALID_RECIPIENTS:
            raise serializers.ValidationError(
                f"Invalid recipient. Choose from: {', '.join(VALID_RECIPIENTS)}."
            )
        return value

    def validate_question_4(self, value):
        if value.lower() not in VALID_LEVELS_OF_DETAIL:
            raise serializers.ValidationError(
                f"Invalid level of detail. Choose from: {', '.join(VALID_LEVELS_OF_DETAIL)}."
            )
        return value

    def validate_question_5(self, value):
        if value.lower() not in VALID_GREETINGS:
            raise serializers.ValidationError(
                f"Invalid style of greetings. Choose from: {', '.join(VALID_GREETINGS)}."
            )
        return value

    def validate_question_6(self, value):
        # Allow free text but enforce a max length
        if len(value) > 255:
            raise serializers.ValidationError(
                "Preferred words or phrases must be 255 characters or fewer."
            )
        return value

    def validate_question_7(self, value):
        if value.lower() not in VALID_FORMATTING_STYLES:
            raise serializers.ValidationError(
                f"Invalid formatting style. Choose from: {', '.join(VALID_FORMATTING_STYLES)}."
            )
        return value

    def validate_question_8(self, value):
        if value.lower() not in VALID_PURPOSES:
            raise serializers.ValidationError(
                f"Invalid purpose. Choose from: {', '.join(VALID_PURPOSES)}."
            )
        return value

    def validate_question_9(self, value):
        if value.lower() not in VALID_EMOTIONAL_TONES:
            raise serializers.ValidationError(
                f"Invalid emotional tone. Choose from: {', '.join(VALID_EMOTIONAL_TONES)}."
            )
        return value

    def validate_question_10(self, value):
        if value.lower() not in VALID_CULTURAL_STYLES:
            raise serializers.ValidationError(
                f"Invalid cultural or linguistic consideration. Choose from: {', '.join(VALID_CULTURAL_STYLES)}."
            )
        return value