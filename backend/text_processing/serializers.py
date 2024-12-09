from rest_framework import serializers


class StyleQuestionSerializer(serializers.Serializer):
    question = serializers.CharField()
    answer = serializers.CharField()

    def validate_question(self, value):
        if not value.strip():
            raise serializers.ValidationError("Question cannot be empty.")
        return value

    def validate_answer(self, value):
        if not value.strip():
            raise serializers.ValidationError("Answer cannot be empty.")
        return value


class ChatRequestSerializer(serializers.Serializer):
    request = serializers.CharField(required=True)  # Always required
    name = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    surname = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    category = serializers.ChoiceField(choices=[('formal', 'Formal'), ('neutral', 'Neutral'), ('informal', 'Informal')], required=False)
    recipients = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    slang = serializers.BooleanField(required=False)
    intentional_errors = serializers.BooleanField(required=False)
    detail_level = serializers.ChoiceField(choices=[('brief', 'Brief'), ('moderate', 'Moderate'), ('elaborate', 'Elaborate')], required=False)
    tone = serializers.ChoiceField(choices=[('polite', 'Polite'), ('friendly', 'Friendly'), ('serious', 'Serious'), ('playful', 'Playful')], required=False)
    vocabulary_complexity = serializers.ChoiceField(choices=[('simple', 'Simple'), ('moderate', 'Moderate'), ('advanced', 'Advanced')], required=False)
    politeness_level = serializers.ChoiceField(choices=[('low', 'Low'), ('moderate', 'Moderate'), ('high', 'High')], required=False)
    punctuation_style = serializers.ChoiceField(choices=[('formal', 'Formal'), ('casual', 'Casual')], required=False)
    message_type = serializers.ChoiceField(choices=[('chat', 'Chat'), ('email', 'Email')], required=False)
    questions = StyleQuestionSerializer(many=True, required=False)

    def validate_questions(self, value):
        if value and len(value) > 5:
            raise serializers.ValidationError("A maximum of 5 questions are allowed.")
        return value