# openai_helper.py
from openai import OpenAI
import os
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

class OpenAIHelper:
    @staticmethod
    def generate_system_content(tone, message_type, mode):
        style_overview = (
            "The message may be one of three types: 'email', 'chat', or 'letter'.\n"
            "- 'Email': Format with appropriate salutations, closings, and a coherent flow for professional or semi-formal correspondence. Ensure the tone matches the context, whether it's a formal business email or a more relaxed semi-formal message. Use paragraphs to organize content logically and include a clear subject line.\n"
            "- 'Chat': Format as a casual and quick message, suitable for platforms like Teams or other chat apps. Keep the message brief and to the point, using informal language and emojis if appropriate. Focus on clarity and quick readability, and use bullet points or numbered lists for easy scanning.\n"
            "- 'Letter': Format with appropriate salutations and closings, using a formal and comprehensive style with sophisticated words. Examples include motivation letters or cover letters. Ensure the letter is well-structured with an introduction, body, and conclusion. Use formal language and avoid contractions. The letter should be at least 300 words to provide sufficient detail and context.\n\n"
            "The message has two modes: 'create' or 'edit'.\n"
            "- 'Create': Formulate a new message based on the user’s requirements.\n"
            "- 'Edit': Refine or adjust the existing message to meet the specified tone and format.\n\n"
            "The tone can be:\n"
            "- 'Professional': This tone is formal and respectful, using precise and technical language suitable for business and official communications. It maintains a high level of professionalism, avoiding colloquialisms and ensuring clarity and accuracy in all interactions.\n"
            "- 'Semi-formal': This format strikes a balance between formality and approachability. It is polite and respectful, yet warm and engaging. Suitable for professional settings where a friendly and personable approach is appreciated, it uses clear language while allowing for some casual expressions.\n"
            "- 'Informal': The tone is casual and friendly, ideal for personal or informal contexts. It uses conversational language, including colloquialisms and humor, to create a relaxed and approachable atmosphere. It is suitable for interactions where a personal touch and ease of communication are prioritized.\n"
            "- 'Aggressive': This tone is rude and disrespectful, lacking politeness, and expressing disagreement in a harsh and confrontational manner. It often involves blunt language and a dismissive attitude, creating a hostile and unwelcoming environment.\n"
        )

        tone_descriptions = {
            "professional": "Use a formal, respectful, and concise style with precise language. Avoid colloquialisms, ensuring suitability for business communication. Maintain a high level of professionalism, focusing on clarity and accuracy. Use technical terms appropriately and ensure that the message is clear and unambiguous.",
            "semi-formal": "Use a polite and approachable tone. Balance formality and warmth, making it suitable for professional but friendly communication. Use clear language while allowing for some casual expressions. Ensure that the tone is respectful and engaging, making the communication feel personable yet professional.",
            "informal": "Use a casual and friendly tone, suitable for personal chats or messages to close acquaintances. Incorporate conversational language, including colloquialisms and humor, to create a relaxed and approachable atmosphere. Ensure that the message is easy to understand and feels natural and spontaneous.",
            "aggressive": "Use a rude and disrespectful style without politeness. Be direct, harsh, and express disagreement forcefully. Use blunt language and a dismissive attitude, creating a hostile and unwelcoming environment. Ensure that the tone conveys a strong sense of confrontation and assertiveness."
        }

        message_type_instructions = {
            "email": "Format the content to suit an email. Include appropriate salutations and closings, and maintain a structured flow. Use paragraphs to organize information logically, and ensure the tone matches the context of the email. Include a clear subject line and use professional language.",
            "chat": "Format the content to suit a chat message. Keep the structure conversational and concise, focusing on clarity for quick reading. Use informal language and emojis if appropriate. Break the message into short, digestible parts, and use bullet points or numbered lists for easy scanning.",
            "letter": "Format the content to suit the letter style. Use formal and comprehensive language, sophisticated expressions, and a minimum of 300 words. Align with motivation or cover letter formats. Ensure the letter is well-structured with an introduction, body, and conclusion. Use formal language, avoid contractions, and provide sufficient detail and context."
        }

        if tone.lower() not in tone_descriptions or message_type.lower() not in message_type_instructions:
            raise ValueError("Unsupported tone or message type specified.")

        return (
            f"You are an assistant specializing in {'editing' if mode == 'edit' else 'creating'} messages. "
            f"{'Rewrite' if mode == 'edit' else 'Create'} the message to match a '{tone}' tone suitable for a '{message_type}' context.\n\n"
            f"{style_overview}\n\n"
            f"Current Task:\n{tone_descriptions[tone.lower()]}\n{message_type_instructions[message_type.lower()]}"
        )

    @staticmethod
    def chatgpt_api_call(message, parameters, mode="create"):
        if not isinstance(parameters, dict):
            raise ValueError("Parameters must be a dictionary.")

        tone = parameters.get("tone", "").lower()
        message_type = parameters.get("message_type", "").lower()
        if not tone or not message_type:
            raise ValueError("Both 'tone' and 'message_type' are required parameters.")

        client = OpenAI()

        system_content = OpenAIHelper.generate_system_content(tone, message_type, mode)
        user_content = (
            f"{'Please edit the following message:' if mode == 'edit' else 'User\'s requirements for the message are as follows:'}\n\n'{message}'"
        )

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_content},
                    {"role": "user", "content": user_content}
                ],
                stream=False
            )
            return response.choices[0].message.content
        except Exception as e:
            raise RuntimeError(f"Failed to call OpenAI API: {e}")
