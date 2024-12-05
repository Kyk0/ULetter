from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenVerifyView

from .serializers import UserProfileChangePasswordSerializer
from .views import (SignupView,
                    LoginView,
                    LogoutView,
                    UserProfileView,
                    UserProfileUpdateView,
                    UserProfileChangePasswordView,
                    UserAccountDeactivationView,
                    UserProfileMessageHistory,)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('profile/change-password/', UserProfileChangePasswordView.as_view(), name='password-change'),
    path('profile/message-history/', UserProfileMessageHistory.as_view(),name='message-history'),
    path('profile/deactivate/', UserAccountDeactivationView.as_view(), name='deactivate'),
    path('token/', TokenRefreshView.as_view(), name='token'),
    path('token/verify/', TokenVerifyView.as_view(), name='token-verify'),
]