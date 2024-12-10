import React, { useEffect, useState } from 'react';
import api from '../api'; // Ваш конфиг для axios
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoDetail = () => {
    const { id } = useParams(); // Получаем id видео из URL
    const [video, setVideo] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const navigate = useNavigate(); // Хук для навигации

    // Функция для загрузки видео и комментариев
    useEffect(() => {
        const fetchVideoAndComments = async () => {
            try {
                const videoResponse = await api.get(`videos/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setVideo(videoResponse.data);

                // Загрузка комментариев отдельно
                const commentsResponse = await api.get(`videos/${id}/comments/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setComments(commentsResponse.data); // Устанавливаем комментарии из ответа
            } catch (error) {
                console.error('Error fetching video or comments:', error);
            }
        };
        fetchVideoAndComments();
    }, [id]);

    // Функция отправки комментария
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        if (!comment.trim()) {
            console.log("Comment is empty!");
            return;
        }
    
        try {
            const token = localStorage.getItem('access_token');
            const newComment = await submitComment(id, comment, token); // Ждем ответ сервера
    
            setComments((prevComments) => [...prevComments, newComment]); // Добавляем реальный ответ сервера
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    // Функция для возвращения на предыдущую страницу
    const handleGoBack = () => {
        navigate(-1); // Возвращаемся на предыдущую страницу
    };

    if (!video) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>{video.title}</h1>
            </div>
            <div style={styles.videoAndComments}>
                <div style={styles.videoCard}>
                    <video src={video.video_file} controls style={styles.videoPlayer} />
                </div>
                <div style={styles.commentSection}>
                    <h3 style={styles.commentTitle}>Комментарии:</h3>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} style={styles.commentCard}>
                                {/* Отображаем имя пользователя, если оно есть */}
                                <p style={styles.commentUser}>отправил: {comment.user ? comment.user : 'Unknown'}</p>
                                <p style={styles.commentText}>{comment.text}</p>
                            </div>
                        ))
                    ) : (
                        <p style={styles.noComments}>пока нет комментариев</p>
                    )}
                    <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Напишите комментарий..."
                            style={styles.commentInput}
                        />
                        <button type="submit" style={styles.commentButton}>Добавить комментарий</button>
                    </form>
                </div>
            </div>
            
            {/* Кнопка для возврата на предыдущую страницу */}
            <button onClick={handleGoBack} style={styles.backButton}>
                вернуться к списку видео
            </button>
        </div>
    );
};

// Функция отправки комментария
const submitComment = async (videoId, text, token) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/videos/${videoId}/comments/`,
            {
                text: text.trim(),  // Отправляем только текст комментария
                video: videoId,     // Указываем ID видео
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Comment posted:', response.data);
        return response.data;  // Возвращаем только что созданный комментарий
    } catch (error) {
        console.error('Error posting comment:', error.response?.data || error.message);
        throw error; // Для обработки ошибки в основном компоненте
    }
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh', // Используем min-height, чтобы контейнер мог расти
        padding: '20px',
        color: '#fff',
        backgroundImage: 'url(/fon.png)', // Фон для страницы
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflowY: 'auto', // Разрешаем вертикальную прокрутку
        boxSizing: 'border-box', // Учитываем паддинги в расчете размеров
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '10px',
        color: '#fff',
    },
    videoAndComments: {
        display: 'flex',
        flexDirection: 'row',
         // Добавляем пространство между видео и комментарием
        width: '100%',
        maxWidth: '1200px', // Ограничиваем максимальную ширину
    },
    videoCard: {
        flex: 1, // Видео занимает 1 часть пространства
        backgroundColor: '#000',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: '#fff',
        padding: '10px',
    },
    videoPlayer: {
        width: '100%',
        borderRadius: '8px',
    },
    commentSection: {
        flex: 1, // Комментарии занимают 1 часть пространства
        backgroundColor: '#000',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: '#fff',
        padding: '20px',
        overflowY: 'auto',
        maxHeight: '500px', // Ограничиваем высоту для прокрутки
    },
    commentTitle: {
        fontSize: '1.5rem',
        marginBottom: '10px',
    },
    commentCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
    },
    commentUser: {
        fontSize: '1.1rem',
        color: '#ccc', // Цвет для имени пользователя
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    commentText: {
        fontSize: '1rem',
    },
    noComments: {
        fontSize: '1.2rem',
        color: '#fff',
    },
    commentForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
    },
    commentInput: {
        width: '100%',
        height: '50px',
        marginBottom: '10px',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
    },
    commentButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    backButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.2rem',
    },
};

export default VideoDetail;


