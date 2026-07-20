from django.urls import path
from .views import *
# from .views import RegisterView, CustomAuthToken, UserProfileView, VehicleListCreateView, VehicleDetailView, ServiceRequestListView, ServiceRequestDetailView, MechanicStatsView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('vehicles/', VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('vehicles/<int:pk>/', VehicleDetailView.as_view(), name='vehicle-detail'),
    path('service-requests/', ServiceRequestListView.as_view(), name='service-request-list'),
    path('service-requests/<int:pk>/', ServiceRequestDetailView.as_view(), name='service-request-detail'),
    path('mechanic/stats/', MechanicStatsView.as_view(), name='mechanic-stats'),
]
