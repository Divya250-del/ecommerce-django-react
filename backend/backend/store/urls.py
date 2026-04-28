from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from store.views import (
    ProductListView,
    ProductDetailView,
    CategoryListView,
    CartDetailView,
    AddToCartView,
    RemoveFromCartView,
    UpdateCartQuantityView,
    CreateOrderView,
    CustomTokenObtainPairView,
    RegisterView,
)




urlpatterns = [
    # 🔐 Auth
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # 🛍 Products
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

    # 📂 Categories
    path('categories/', CategoryListView.as_view(), name='category-list'),

    # 🛒 Cart
    path('cart/', CartDetailView.as_view(), name='cart-detail'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('cart/update/', UpdateCartQuantityView.as_view(), name='update-cart'),

    # 📦 Orders
    path('orders/create/', CreateOrderView.as_view(), name='create-order'),
]