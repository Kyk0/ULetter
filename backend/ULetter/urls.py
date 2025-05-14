from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/text-processing/', include('text_processing.urls')),
    path('api/users/', include('users.urls')),
    path('api/style_personalization/', include('style_personalization.urls')),
]
