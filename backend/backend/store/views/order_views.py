from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from store.models import Cart, Order, OrderItem
from store.permissions import IsCustomerUser


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated, IsCustomerUser]

    def post(self, request):
        try:
            data = request.data

            name = data.get("name")
            address = data.get("address")
            phone = data.get("phone")
            payment_method = data.get("payment_method", "COD")

            if not name:
                return Response({"error": "Name is required"}, status=400)

            if not address:
                return Response({"error": "Address is required"}, status=400)

            if not phone or not phone.isdigit() or len(phone) < 10:
                return Response({"error": "Invalid Phone Number"}, status=400)

            cart, created = Cart.objects.get_or_create(user=request.user)

            if not cart.items.exists():
                return Response({"error": "Cart is empty"}, status=400)

            total = sum(
                float(item.product.price) * item.quantity
                for item in cart.items.all()
            )

            order = Order.objects.create(
                user=request.user,
                total_amount=total,
            )

            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                )

            cart.items.all().delete()

            return Response({
                "message": "Order Placed Successfully",
                "order_id": order.id,
            })

        except Exception as e:
            return Response({"error": str(e)}, status=500)