from openai import OpenAI
import os
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


def chatgpt_api_call(message, mode, message_type, tone):
    client = OpenAI()

    system_content = (
        f"You are an assistant specializing in {'editing' if mode == 'edit' else 'creating'} messages. "
        f"{'Rewrite' if mode == 'edit' else 'Create'} the message to match a '{tone}' tone suitable for a '{message_type}'. "
        "Ensure clarity, professionalism, and appropriateness for the context."
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
    text = response.choices[0].message.content
    return text

