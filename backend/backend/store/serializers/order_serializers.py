from rest_framework import serializers
from store.models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    product_image = serializers.ImageField(
        source="product.image",
        read_only=True
    )

    product_price = serializers.DecimalField(
        source="product.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    customer_name = serializers.CharField(
        source="order.user.username",
        read_only=True
    )

    order_id = serializers.IntegerField(
        source="order.id",
        read_only=True
    )

    ordered_at = serializers.DateTimeField(
        source="order.created_at",
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "order_id",
            "customer_name",
            "ordered_at",

            "product",
            "product_name",
            "product_image",
            "product_price",

            "quantity",
            "price",
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "total_amount",
            "created_at",
            "items",
        ]