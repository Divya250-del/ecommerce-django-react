from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from store.models import Product, Cart, CartItem
from store.serializers import CartSerializer, CartItemSerializer
from store.permissions import IsCustomerUser


class CartDetailView(APIView):
    permission_classes = [IsAuthenticated,IsCustomerUser]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        cart, created = Cart.objects.get_or_create(user=request.user)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

        if not created:
            item.quantity += 1
            item.save()

        return Response({
            "message": "Product Added to cart",
            "cart": CartSerializer(cart).data
        })


class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        item_id = request.data.get("item_id")

        if not item_id:
            return Response({"error": "Item id is required"}, status=400)

        CartItem.objects.filter(id=item_id, cart__user=request.user).delete()

        return Response({"message": "Cart Item deleted"})


class UpdateCartQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        item_id = request.data.get("item_id")
        quantity = request.data.get("quantity")

        if not item_id or quantity is None:
            return Response({"error": "Item id and quantity are required"}, status=400)

        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=404)

        quantity = int(quantity)

        if quantity < 1:
            item.delete()
            return Response({"message": "Cart item removed"})

        item.quantity = quantity
        item.save()

        serializer = CartItemSerializer(item)
        return Response(serializer.data)