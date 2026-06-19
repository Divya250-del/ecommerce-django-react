from rest_framework.permissions import BasePermission
from .models import UserProfile

class IsSellerUser(BasePermission):
    message = "Only sellers can perform this action."

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role == "seller"
        except UserProfile.DoesNotExist:
            return False
        

class IsCustomerUser(BasePermission):
    message = "Only customers can perform this action."

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role == "customer"
        except UserProfile.DoesNotExist:
            return False
        
class IsProductOwner(BasePermission):
    message = "Only Product Owner can perform this action."

    def has_object_permission(self, request, view, obj):
        return request.user == obj.seller


