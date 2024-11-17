from backend.text_processing.models import Message
from .models import Message


#store records:
message = Message(user="User1", prompt="What's the weather?", response="It's sunny today.", timestamp=" 10:00, 13.11.2024")

message.save()

#retrieve records:
def get_all_messages():
    return Message.objects.all()

def get_messages_by_user():
    return Message.objects.filter(id=user)

#delete records:
def delete_all_messages():
        Message.objects.all().delete
        print('All messages were deleted succesfully!')


def delete_message_by_id(message_id):
    try:
        message = Message.objects.get(id=message_id)
        message.delete()
        print('The message was deleted succesfully!')
        return True 
    except Message.DoesNotExist:
        print("The message wasn't found, try again!")
        return False 
     
