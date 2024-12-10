from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from video_platform import views  # Или укажите точный путь к файлу views
from .views import CurrentUserView, CommentViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('videos.urls')),  # Все маршруты для видео и комментариев в videos.urls
    path('api/videos/<int:video_id>/comments/', CommentViewSet.as_view({'get': 'list', 'post': 'create'})),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/', views.RegisterView.as_view(), name='register'),
    path('api/user/me/', CurrentUserView.as_view(), name='current_user'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
