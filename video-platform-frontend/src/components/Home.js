import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        navigate('/login');
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                {user && (
                    <div style={styles.userInfo}>
                        <p style={styles.username}>Текущий пользователь: <strong>{user.username}</strong></p>
                        <button style={styles.button} onClick={handleLogout}>Выход</button>
                    </div>
                )}
                <h1 style={styles.title}>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Yadro_logo.svg/300px-Yadro_logo.svg.png" 
                        alt="Logo"
                        style={{ width: '150px', height: '150px', marginRight: '10px', verticalAlign: 'middle' }} 
                    />
                </h1>
                <div style={styles.actionBlock}>
                    {user ? (
                        <>
                            <Link to="/videos">
                                <button style={styles.blockButton}>Смотреть Видео</button>
                            </Link>
                            <Link to="/upload">
                                <button style={styles.blockButton}>Загрузить Видео</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button style={styles.blockButton}>Вход</button>
                            </Link>
                            <Link to="/register">
                                <button style={styles.blockButton}>Регистрация</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        //backgroundColor: '#f0f0f0', // Фон страницы
        padding: '20px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Белый фон блока
        color: '#fff', // Чёрный текст
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        border: '1px solid #ddd', // Светлая граница
        borderRadius: '8px', // Округлённые углы
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Лёгкая тень
        maxWidth: '800px', // Ограничение ширины
        width: '90%', // Адаптивная ширина
        margin: '0 auto', // Центрирование
    },
    userInfo: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '1rem',
        textAlign: 'right',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    username: {
        fontSize: '1.1rem',
        fontWeight: '500',
        marginBottom: '0.5rem',
    },
    button: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#f5f5f5',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-in-out',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        fontWeight: '700',
    },
    actionBlock: {
        backgroundColor: '#fff', // Светлый фон
        padding: '20px',
        gap: '20px',
        width: '390px',
        borderRadius: '12px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    blockButton: {
        padding: '1rem 2rem',
        fontSize: '1.2rem',
        cursor: 'pointer',
        backgroundColor: '#2830a7',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
};

export default Home;
