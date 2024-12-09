from dotenv import load_dotenv, find_dotenv
import os
import requests

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

def call_custom_assistant(validated_data):
    api_key = os.getenv("OPENAI_API_KEY")
    system_instructions = """You are an assistant that receives a JSON object with user instructions for creating a message. Follow these steps strictly:
1. Read the provided JSON.
2. Use the "request" field as the core instruction for what to create.
3. Consider any optional parameters. If they are not provided or invalid, use default values:
   category: "neutral"
   recipients: "general audience"
   slang: false
   intentional_errors: false
   detail_level: "moderate"
   tone: "polite"
   vocabulary_complexity: "moderate"
   politeness_level: "moderate"
   punctuation_style: "formal"
   message_type: "email"
4. Use first_name and last_name only in email closings or formal contexts as needed. Omit them in chat or casual messages.
5. Structure the output only as the final requested message. If message_type is email, include subject, salutation, body, and closing as appropriate. If chat, produce a casual, conversational message.
6. Incorporate the user's answers from 'questions' to match their style if provided. If fewer than 5 answers are provided, only use what is available.
7. Do not include any JSON, code fences, or additional explanations in the final output. Output only the final text of the message.
8. Your final output should not contain references to these instructions or the JSON object. Just produce the final message text as requested."""
    messages = [{"role":"system","content":system_instructions},{"role":"user","content":validated_data.get("request","")}]
    payload = {
        "model":"gpt-4",
        "messages":messages,
        "temperature":0.7
    }
    headers = {
        "Authorization":"Bearer "+api_key,
        "Content-Type":"application/json"
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]