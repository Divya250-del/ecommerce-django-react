from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from store.models import Cart, Order, OrderItem
from store.permissions import IsCustomerUser,IsSellerUser
from rest_framework.generics import ListAPIView
from store.serializers import OrderSerializer,OrderItemSerializer
from store.razorpay_client import client


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

            razorpay_order = client.order.create({
                "amount": int(total * 100),  # rupees -> paise
                "currency": "INR"
            })

            order.razorpay_order_id = razorpay_order["id"]
            order.save()

            return Response({
                "message": "Order Created",
                "order_id": order.id,

                "razorpay_order_id": razorpay_order["id"],
                "amount": razorpay_order["amount"],
                "currency": razorpay_order["currency"],
            })

        except Exception as e:
            return Response({"error": str(e)}, status=500)

class MyOrdersView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, IsCustomerUser]

    def get_queryset(self):
        return (
            Order.objects
            .filter(user=self.request.user)
            .prefetch_related("items__product")
            .order_by("-created_at")
        )
    
class SellerOrdersView(ListAPIView):
    permission_classes = [IsAuthenticated, IsSellerUser]
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        return (
            OrderItem.objects
            .filter(product__seller=self.request.user)
            .select_related(
                "product",
                "order",
                "order__user"
            )
            .order_by("-order__created_at")
        )
