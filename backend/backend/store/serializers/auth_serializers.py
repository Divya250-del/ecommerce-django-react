from django.contrib.auth.models import User
from rest_framework import serializers
from store.models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "role"]

    def get_role(self, user):
        try:
            return user.userprofile.role
        except UserProfile.DoesNotExist:
            return "customer"


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(
        choices=[("customer", "Customer"), ("seller", "Seller")],
        write_only=True,
        required=False,
        default="customer",
    )

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2", "role"]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        role = validated_data.pop("role", "customer")
        validated_data.pop("password2")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )

        UserProfile.objects.create(user=user, role=role)

        return user