import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleUpload = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in.');
            return;
        }
    
        if (!file || !title || !description) {
            setError('Please fill all fields and select a video.');
            return;
        }

        const formData = new FormData();
        formData.append('video_file', file);
        formData.append('title', title);
        formData.append('description', description);
    
        try {
            const response = await api.post('videos/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Video uploaded successfully!');
            setTimeout(() => navigate('/videos'), 2000); // Перенаправление на страницу видео через 2 секунды
        } catch (error) {
            console.error('Upload error:', error.response?.data || error.message);
            setError('Error uploading video. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>загрузить видео</h1>
                <div style={styles.formContainer}>
                    <input 
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])} 
                        style={styles.input}
                    />
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Название видео" 
                        style={styles.input}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Описание видео"
                        style={styles.textarea}
                    />
                    {error && <p style={styles.error}>{error}</p>}
                    {message && <p style={styles.message}>{message}</p>}
                    <button onClick={handleUpload} style={styles.uploadButton}>
                        загрузить видео
                    </button>
                </div>
            </div>
            <div style={styles.backLink}>
                <button onClick={() => navigate('/')} style={styles.backButton}>вернуться домой</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        backgroundImage: 'url(/fon.png)', // Фон для страницы
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        color: '#fff',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px',
        marginTop: '50px',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    formContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        padding: '12px',
        fontSize: '1rem',
        width: '100%',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        color: '#333',
    },
    textarea: {
        padding: '12px',
        fontSize: '1rem',
        width: '100%',
        height: '120px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        color: '#333',
    },
    uploadButton: {
        padding: '12px 20px',
        fontSize: '1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
    },
    backLink: {
        marginTop: '20px',
    },
    backButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '1rem',
        marginTop: '10px',
    },
    message: {
        color: 'green',
        fontSize: '1rem',
        marginTop: '10px',
    },
};

export default UploadVideo;
