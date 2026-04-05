from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer
from rest_framework import status
from .models import Product, Category,Cart,CartItem,Order,OrderItem
from .serializers import ProductSerializer,CategorySerializer,CartItemSerializer,CartSerializer
from rest_framework.pagination import PageNumberPagination
from .filters import ProductFilter
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from .permissions import IsAdminUser, IsCustomerUser


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer




class ProductPagination(PageNumberPagination):   # ← new
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 50


@api_view(['GET'])
def get_products(request):
    queryset = Product.objects.select_related('category').all()

    filterset = ProductFilter(request.GET, queryset=queryset)
    if filterset.is_valid():
        queryset = filterset.qs

    search = request.GET.get('search', '')
    if search:
        queryset = queryset.filter(name__icontains=search)

    ordering = request.GET.get('ordering', '-created_at')
    allowed_ordering = ['price', '-price', 'name', '-name', 'created_at', '-created_at']
    if ordering in allowed_ordering:
        queryset = queryset.order_by(ordering)

    paginator = ProductPagination()
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = ProductSerializer(result_page, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)



@api_view(['GET'])
def get_product(request,pk):
    try:
        product = Product.objects.get(id=pk)
        serializer  = ProductSerializer(product,context={'request':request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product Not Found'},status=400)



@api_view(['GET'])
def get_categories(request):
    categorys = Category.objects.all()
    serializer = CategorySerializer(categorys, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    cart,created = Cart.objects.get_or_create(user=request.user)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += 1
        item.save()
    return Response({'message': 'Product Added to cart',"cart":CartSerializer(cart).data})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    """
    when clicked on removed from cart
    """
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return  Response({'message':'Cart Item deleted'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    if not item_id or quantity is None:
        return Response({'error': 'Quantity must be atleast 1'},status=400)
    try:
        item = CartItem.objects.get(id = item_id)
        if int(quantity) <1:
            item.delete()
            return Response({'error': ' Quantity must be atlease 1'},status=400)
        item.quantity = quantity
        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'},status=400)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated,IsCustomerUser])
def create_order(request):
    try:
        data = request.data

        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        payment_method = data.get('payment_method','COD')

        #Validate Phone Number
        if not phone.isdigit() or len(phone) < 10:
            return Response({'error':"Invalid Phone Number"},status=400)
        
        # Get User's Cart

        cart,created = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'},status=400)
        
        total = sum(float(item.product.price)* item.quantity for item in cart.items.all())

        # Create Order
        order = Order.objects.create(user=request.user,total_amount=total)

        for item in cart.items.all():
            OrderItem.objects.create(order=order,
                                            product=item.product,
                                            quantity=item.quantity,
                                            price=item.product.price)
        cart.items.all().delete()
        return Response({
            "message":"Order Placed Successfully",
            "order_id": order.id,
        })
    except Exception as e:
        return Response({"error":str(e)},status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message":"User Created Successfully","user":UserSerializer(user).data},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)






        
         

        

    





