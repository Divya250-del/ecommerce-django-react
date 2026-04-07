from django.shortcuts import render
from store.models import Order, UserProfile, OrderItem
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.db.models.functions import TruncDay
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Count, F, FloatField, ExpressionWrapper
from store.permissions import IsAdminUser, IsCustomerUser


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_summary(request):
    """
    Total Revenue, Total Orders, Total Customers
    """
    total_revenue = Order.objects.aggregate(
        total=Sum('total_amount')
    )['total'] or 0

    total_orders = Order.objects.count()

    total_customers = UserProfile.objects.filter(role='customer').count()

    return Response({
        "total_revenue":   total_revenue,
        "total_orders":    total_orders,
        "total_customers": total_customers
    })


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_revenue(request):
    """
    Daily revenue for last 30 days
    """
    since = timezone.now() - timedelta(days=30)

    last_30_day_revenue = (
        Order.objects
        .filter(created_at__gte=since)
        .annotate(day=TruncDay('created_at'))
        .values('day')
        .annotate(revenue=Sum('total_amount'))
        .order_by('day')
    )

    return Response([
        {
            'day':     item['day'].strftime('%Y-%m-%d'),
            'revenue': float(item['revenue'] or 0)
        }
        for item in last_30_day_revenue
    ])


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_top_products(request):
    """
    Top 10 Best Selling Products by Revenue
    """
    top_products = (
        OrderItem.objects
        .values('product__name')
        .annotate(units_sold=Sum('quantity'))
        .annotate(
            revenue=Sum(
                ExpressionWrapper(
                    F('quantity') * F('price'),
                    output_field=FloatField()
                )
            )
        )
        .order_by('-revenue')[:10]
    )

    return Response([
        {
            'product':    item['product__name'],
            'units_sold': item['units_sold'],
            'revenue':    float(item['revenue'] or 0)
        }
        for item in top_products
    ])


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_orders_by_status(request):
    """
    Count of orders grouped by status
    e.g. pending: 10, completed: 45, cancelled: 3
    """
    orders_by_status = (
        Order.objects
        .values('status')
        .annotate(order_count=Count('status'))
        .order_by('status')
    )

    return Response([
        {
            'status':      item['status'],
            'order_count': item['order_count']
        }
        for item in orders_by_status
    ])