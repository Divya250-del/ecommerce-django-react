from rest_framework.generics import ListAPIView, RetrieveAPIView,CreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from store.models import Product, Category
from store.serializers import ProductSerializer, CategorySerializer
from store.filters import ProductFilter
from store.permissions import IsCustomerUser,IsSellerUser, IsProductOwner
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser



class ProductPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = "page_size"
    max_page_size = 50


class ProductListView(ListAPIView):
    permission_classes = [IsAuthenticated, IsCustomerUser | IsSellerUser]
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        queryset = Product.objects.select_related("category").all()

        filterset = ProductFilter(self.request.GET, queryset=queryset)
        if filterset.is_valid():
            queryset = filterset.qs

        search = self.request.GET.get("search", "")
        if search:
            queryset = queryset.filter(name__icontains=search)

        ordering = self.request.GET.get("ordering", "-created_at")
        allowed_ordering = [
            "price",
            "-price",
            "name",
            "-name",
            "created_at",
            "-created_at",
        ]

        if ordering in allowed_ordering:
            queryset = queryset.order_by(ordering)

        return queryset


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer
    lookup_field = "id"
    lookup_url_kwarg = "pk"


class ProductCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated, IsSellerUser, ]
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = ProductSerializer


    def create(self, request, *args, **kwargs):
        print("REQUEST DATA:", request.data)
        return super().create(request, *args, **kwargs)


    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

class ProductUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsSellerUser, IsProductOwner]
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer
    lookup_field = "id"
    lookup_url_kwarg = "pk"

class SellerProductListView(ListAPIView):
    permission_classes = [IsAuthenticated, IsSellerUser]
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(seller=self.request.user)




class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)