import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from store.models import Cart, Order
from store.razorpay_client import client

class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        data = request.data
        
        # 1. Extract the transaction keys sent by React
        razorpay_order_id = data.get("razorpay_order_id")
        razorpay_payment_id = data.get("razorpay_payment_id")
        razorpay_signature = data.get("razorpay_signature")

        # 2. Basic validation check
        if not all([razorpay_order_id, razorpay_payment_id, razorpay_signature]):
            return Response(
                {"error": "Missing payment credentials from payload"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # 3. Use Razorpay utility to verify signature authenticity
            # This throws an exception if the signature doesn't match
            client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })

            # 4. Success! Now update your database order row
            # Fetch the order tied to this razorpay ID
            try:
                 
                
                order = Order.objects.get(razorpay_order_id=razorpay_order_id)
                order.status = "Paid" 
                order.save()

                # Clean up the user's cart now that the transaction is settled
                cart, _ = Cart.objects.get_or_create(user=request.user)
                cart.items.all().delete()

                return Response(
                    {"message": "Payment verified and order finalized safely!"}, 
                    status=status.HTTP_200_OK
                )

            except Order.DoesNotExist:
                return Response(
                    {"error": "Payment verified but corresponding Order not found in database"}, 
                    status=status.HTTP_404_NOT_FOUND
                )

        except razorpay.errors.SignatureVerificationError:
            # Bad signatures mean data manipulation or expired tokens
            return Response(
                {"error": "Security signature verification failed. Invalid transaction."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Internal verification failure: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )