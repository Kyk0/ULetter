# uLetter/views.py
from django.http import JsonResponse
from . openai_helper import chatgpt_api_call

def process_message(request):
    if request.method == 'GET':
        text = request.GET.get('text', '')
        mode = request.GET.get('mode', '')
        message_type = request.GET.get('messageType', '')
        tone = request.GET.get('tone', '')

        if not all([text, mode, message_type, tone]):
            return JsonResponse({"error": "All parameters (text, mode, messageType, tone) are required."}, status=400)

        try:
            response_text = chatgpt_api_call(text, mode, message_type, tone)
            return JsonResponse({"response": response_text})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only GET requests are allowed."}, status=405)