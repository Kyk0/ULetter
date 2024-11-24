from openai import OpenAI
import os
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


def chatgpt_api_call(message, parameters, mode="create"):
    if not isinstance(parameters, dict):
        raise ValueError("Parameters must be a dictionary.")

    message_type = parameters.get("message_type")
    tone = parameters.get("tone")

    client = OpenAI()

    style_overview = (
        "The message may be one of two types: 'email' or 'chat'.\n"
        "- 'Email': Format with appropriate salutations, closings, and a coherent flow for professional or semi-formal correspondence.\n"
        "- 'Chat': Format as a casual and quick message, suitable for platforms like Teams or other chat apps.\n\n"
        "The message has two modes: 'create' or 'edit'.\n"
        "- 'Create': Formulate a new message based on the user’s requirements.\n"
        "- 'Edit': Refine or adjust the existing message to meet the specified tone and format.\n\n"
        "The tone can be:\n"
        "- 'Professional': Formal and respectful, with precise language suitable for business.\n"
        "- 'Semi-formal': Polite and approachable, balancing formality with warmth.\n"
        "- 'Informal': Casual and friendly, suitable for personal or informal contexts."
    )

    tone_descriptions = {
        "professional": "Use a formal, respectful, and concise style with precise language. Avoid colloquialisms, and ensure it is suitable for business or official communication.",
        "semi-formal": "Use a polite and approachable tone. Balance formality and warmth, making it suitable for professional yet friendly communication, often used in emails to acquaintances or less formal business contexts.",
        "informal": "Use a casual and friendly tone, suitable for personal chats or messages to close acquaintances. Keep it relaxed and approachable, with language that feels natural and spontaneous."
    }

    message_type_instructions = {
        "email": "Format the content to suit an email. Ensure appropriate salutations and closings, and maintain a structured, coherent flow suitable for email communication.",
        "chat": "Format the content to suit a chat message. Keep the structure conversational and concise, focusing on immediacy and clarity for quick reading."
    }

    system_content = (
        f"You are an assistant specializing in {'editing' if mode == 'edit' else 'creating'} messages. "
        f"{'Rewrite' if mode == 'edit' else 'Create'} the message to match a '{tone}' tone suitable for a '{message_type}' context.\n\n"
        f"{style_overview}\n\n"
        f"Current Task:\n{tone_descriptions[tone]}\n{message_type_instructions[message_type]}"
    )

    user_content = (
        f"{'Please edit the following message:' if mode == 'edit' else 'User\'s requirements for the message are as follows:'}\n\n'{message}'"
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_content}
        ],
        stream=False
    )

    return response.choices[0].message.content