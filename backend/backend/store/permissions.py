from rest_framework.permissions import BasePermission
from .models import UserProfile

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        try:
            profile = UserProfile.objects.get(user=request.user)
            return profile.role == 'admin'
        except UserProfile.DoesNotExist:
            return False

class IsCustomerUser(BasePermission):
    def has_permission(self, request, view):
        try:
            profile = UserProfile.objects.get(user=request.user)
            return profile.role == 'customer'
        except UserProfile.DoesNotExist:
            return False
