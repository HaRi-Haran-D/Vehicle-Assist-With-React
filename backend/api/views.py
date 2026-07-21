from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models import Sum, Avg
from .serializers import UserSerializer, RegisterSerializer, VehicleSerializer, ServiceRequestSerializer
from .models import Vehicle, ServiceRequest


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data['username'])
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user).data,
            "token": token.key
        })



class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })



class UserProfileView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user



class VehicleListCreateView(generics.ListCreateAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Vehicle.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Vehicle.objects.filter(user=self.request.user)



class ServiceRequestListView(generics.ListCreateAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profile') and user.profile.role in ['MECHANIC', 'ADMIN']:
            return ServiceRequest.objects.all().order_by('-created_at')
        return ServiceRequest.objects.filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class ServiceRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profile') and user.profile.role in ['MECHANIC', 'ADMIN']:
            return ServiceRequest.objects.all()
        return ServiceRequest.objects.filter(user=user)

    def perform_update(self, serializer):
        user = self.request.user
        if hasattr(user, 'profile') and user.profile.role == 'MECHANIC':
            if serializer.validated_data.get('status') == 'IN_PROGRESS':
                serializer.save(mechanic=user)
            else:
                serializer.save()
        else:
            serializer.save()



class MechanicStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        if not hasattr(user, 'profile') or user.profile.role != 'MECHANIC':
            return Response({"error": "Unauthorized"}, status=403)
        
        today = timezone.now().date()
        
        # Today's Earnings
        todays_jobs = ServiceRequest.objects.filter(
            mechanic=user,
            status='COMPLETED',
            updated_at__date=today
        )
        todays_earnings = todays_jobs.aggregate(Sum('cost'))['cost__sum'] or 0
        
        # Jobs Completed
        jobs_completed = ServiceRequest.objects.filter(
            mechanic=user,
            status='COMPLETED'
        ).count()
        
        # Customer Rating
        avg_rating = ServiceRequest.objects.filter(
            mechanic=user,
            status='COMPLETED',
            mechanic_rating__isnull=False
        ).aggregate(Avg('mechanic_rating'))['mechanic_rating__avg'] or 0
        
        # Weekly Growth
        weekly_growth = 0
        
        return Response({
            "todays_earnings": todays_earnings,
            "jobs_completed": jobs_completed,
            "customer_rating": round(avg_rating, 1),
            "weekly_growth": weekly_growth
        })
