from rest_framework import serializers
from .models import Video, Comment
from django.contrib.auth.models import User

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'video_file', 'user']
        read_only_fields = ['user']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Для вывода имени пользователя
    class Meta:
        model = Comment
        fields = ['id', 'text', 'user', 'video', 'created_at']
        read_only_fields = ['user']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
