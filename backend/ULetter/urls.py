from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('text_processing.urls')),
    path('api/users/', include('users.urls')),
]
