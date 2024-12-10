from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from videos.models import Video, Comment  # Импортируем модели из правильного модуля
from videos.serializers import VideoSerializer, CommentSerializer, UserSerializer  # Импортируем сериализаторы из приложения videos
from rest_framework import viewsets

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            raise ValidationError("Username and password are required.")

        if User.objects.filter(username=username).exists():
            raise ValidationError("User with this username already exists.")

        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


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
        try:
            video = Video.objects.get(id=self.kwargs['video_id'])  # Получаем видео по ID
            return video.comments.all()  # Возвращаем комментарии для этого видео
        except Video.DoesNotExist:
            raise ValidationError("Video not found")  # Если видео не найдено, возвращаем ошибку

    def perform_create(self, serializer):
        try:
            video = Video.objects.get(id=self.kwargs['video_id'])  # Получаем видео по ID
            serializer.save(user=self.request.user, video=video)  # Сохраняем комментарий для этого видео
        except Video.DoesNotExist:
            raise ValidationError("Video not found")  # Если видео не найдено, возвращаем ошибку
