from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from store.views import (
    ProductListView,
    ProductDetailView,
    ProductCreateView,
    ProductUpdateDeleteView,
    SellerProductListView,
    CategoryListView,
    CartDetailView,
    AddToCartView,
    RemoveFromCartView,
    UpdateCartQuantityView,
    CreateOrderView,
    RegisterView,
    MyOrdersView,
    CookieLoginView,
    LogoutView,
    MeView,
    SellerOrdersView,
    VerifyPaymentView,
   
)






urlpatterns = [
    # 🔐 Auth
    path('register/', RegisterView.as_view(), name='register'),
    path("login/", CookieLoginView.as_view(), name="cookie-login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),

    # 🛍 Products
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path("products/create/", ProductCreateView.as_view(),name="product-create"),
    path("products/<int:pk>/manage", ProductUpdateDeleteView.as_view(),name="product-manage"),
    path("seller/products/", SellerProductListView.as_view(), name="seller-products"),

    # 📂 Categories
    path('categories/', CategoryListView.as_view(), name='category-list'),

    # 🛒 Cart
    path('cart/', CartDetailView.as_view(), name='cart-detail'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('cart/update/', UpdateCartQuantityView.as_view(), name='update-cart'),

    # 📦 Orders
    path("orders/", MyOrdersView.as_view(), name="my-orders"),
    path("seller/orders/",SellerOrdersView.as_view(),name="seller-orders"),
    path('orders/create/', CreateOrderView.as_view(), name='create-order'),
    path('payment/verify/', VerifyPaymentView.as_view(), name='verify-payment'),
]