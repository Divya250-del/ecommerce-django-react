from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_order_confirmation_email(user_email, order_id, total_amount):
    print(f"DEBUG EMAIL_HOST: {settings.EMAIL_HOST}")
    print(f"DEBUG EMAIL_USER: {settings.EMAIL_HOST_USER}")
    print(f"🔄 Background process Started: Sending email for Order #{order_id}")
    
    subject = f"🛒 Order Confirmed! Your Order #{order_id} is successful"
    message = f"Thank you for shopping with us!\n\nWe have received your order #{order_id}.\nTotal Amount Paid: Rs. {total_amount}\n\nYour items will be shipped soon."
    from_email = settings.EMAIL_HOST_USER 
    
   
    send_mail(subject, message, from_email, [user_email])
    
    return f"✅ Email successfully sent to {user_email} for Order #{order_id}"