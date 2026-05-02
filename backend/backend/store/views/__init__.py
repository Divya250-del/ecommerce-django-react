from .product_views import ProductListView, ProductDetailView, CategoryListView
from .cart_views import CartDetailView, AddToCartView, RemoveFromCartView, UpdateCartQuantityView
from .order_views import CreateOrderView,MyOrdersView
from .auth_views import (
    RegisterView,
    CookieLoginView,
    LogoutView,
    MeView,
)