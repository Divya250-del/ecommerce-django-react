import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):

    min_price = django_filters.NumberFilter(
        field_name='price',
        lookup_expr='gte'    # price >= min_price
    )

    max_price = django_filters.NumberFilter(
        field_name='price',
        lookup_expr='lte'    # price <= max_price
    )

    category = django_filters.CharFilter(
        field_name='category__slug',
        lookup_expr='iexact'  # case insensitive match
    )

    class Meta:
        model  = Product
        fields = ['category', 'min_price', 'max_price']