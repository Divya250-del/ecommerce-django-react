from .product_views import ProductListView, ProductDetailView, CategoryListView,ProductCreateView,ProductUpdateDeleteView,SellerProductListView
from .cart_views import CartDetailView, AddToCartView, RemoveFromCartView, UpdateCartQuantityView
from .order_views import CreateOrderView,MyOrdersView,SellerOrdersView
from .auth_views import (
    RegisterView,
    CookieLoginView,
    LogoutView,
    MeView,
)
from .verifyrazor_views import VerifyPaymentView