from django.urls import path
from . import views

urlpatterns = [
    path('summary/',            views.get_summary),
    path('revenue/',            views.get_revenue),
    path('top-products/',       views.get_top_products),
    path('orders-by-status/',   views.get_orders_by_status),
]