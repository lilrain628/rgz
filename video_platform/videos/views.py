from rest_framework import viewsets
from .models import Video, Comment
from .serializers import VideoSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Назначаем текущего пользователя

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Извлекаем комментарии для конкретного видео
        try:
            video = Video.objects.get(id=self.kwargs['video_id'])
            return video.comments.all()
        except Video.DoesNotExist:
            raise ValidationError("Video not found")  # Ошибка если видео не существует

    def perform_create(self, serializer):
        # Получаем видео по ID из URL-параметра
        video_id = self.kwargs['video_id']
        try:
            video = Video.objects.get(id=video_id)
            serializer.save(user=self.request.user, video=video)
        except Video.DoesNotExist:
            raise ValidationError("Video not found")  # Ошибка, если видео не найдено
