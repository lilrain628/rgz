import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { UserContext } from '../context/UserContext';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post('token/', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Получаем данные пользователя после входа
            const userResponse = await api.get('user/me/', {
                headers: { Authorization: `Bearer ${response.data.access}` },
            });
            setUser(userResponse.data); // Сохраняем пользователя в контексте

            navigate('/'); // Перенаправление на главную
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
            <h1 style={styles.title}>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Yadro_logo.svg/300px-Yadro_logo.svg.png" 
                    alt="Logo"
                    style={{ width: '150px', height: '150px', marginRight: '10px', verticalAlign: 'middle' }} 
                />
            </h1>
                <h2 style={styles.title}>Вход</h2>
                <input
                    type="text"
                    placeholder="имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleLogin} style={styles.button}>вход</button>
                {error && <p style={styles.error}>{error}</p>}
                <button onClick={handleLogin} style={styles.button}>код доступа</button>
                <p style={styles.registerText}>
                    нет аккаунта?{' '}
                    <Link to="/register" style={styles.registerLink}>зарегистрируйся</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'url(/fon.png)', // Указываем путь к фону
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        boxSizing: 'border-box',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Белый фон с прозрачностью для улучшения контраста
        padding: '40px',
        borderRadius: '10px',
        width: '350px',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', // Увеличенная тень для выделения формы
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: '2.2rem',
        marginBottom: '1.5rem',
        color: '#333',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        padding: '14px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '1rem',
        outline: 'none',
        transition: '0.3s ease',
    },
    inputFocus: {
        borderColor: '#007bff', // Изменение цвета при фокусе
        boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)', // Легкая тень при фокусе
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '1.2rem',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '15px',
        transition: '0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3', // Темный синий при наведении
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: '0.9rem',
        marginTop: '10px',
    },
    registerText: {
        textAlign: 'center',
        fontSize: '1rem',
        marginTop: '20px',
        color: '#333',
    },
    registerLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

// Добавим динамическое изменение стилей при фокусе на input
const InputWithFocus = ({ value, onChange, placeholder, type }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                ...styles.input,
                ...(isFocused ? styles.inputFocus : {}),
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
};

export default Auth;
