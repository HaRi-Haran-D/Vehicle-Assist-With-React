from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Vehicle, ServiceRequest


class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='profile.role', read_only=True)
    mobile_number = serializers.CharField(source='profile.mobile_number', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'mobile_number']



class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=UserProfile.ROLE_CHOICES, write_only=True)
    mobile_number = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'mobile_number']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role', 'CUSTOMER')
        mobile_number = validated_data.pop('mobile_number', '')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        UserProfile.objects.create(user=user, role=role, mobile_number=mobile_number)
        return user



class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'make', 'model', 'year', 'license_plate', 'photo', 'created_at']
        read_only_fields = ['id', 'created_at']



class ServiceRequestSerializer(serializers.ModelSerializer):
    vehicle_details = VehicleSerializer(source='vehicle', read_only=True)
    customer_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = ServiceRequest
        fields = ['id', 'user', 'customer_details', 'vehicle', 'vehicle_details', 'mechanic', 'description', 'location', 'latitude', 'longitude', 'photo', 'status', 'cost', 'mechanic_rating', 'customer_rating', 'scheduled_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
