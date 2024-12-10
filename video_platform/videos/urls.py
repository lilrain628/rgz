from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'videos', VideoViewSet)
router.register(r'comments', CommentViewSet, basename='comment')  # Обрабатываем комментарии

urlpatterns = [
    path('', include(router.urls)),
    path('videos/<int:video_id>/comments/', CommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='video-comments'),  # Путь для комментариев
]
