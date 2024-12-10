// src/hooks/useMovingBackground.js
import { useEffect } from 'react';

const useMovingBackground = () => {
    useEffect(() => {
        // Функция, которая обновляет позицию фона
        const handleScroll = () => {
            const scrollPosition = window.scrollY;  // Получаем значение прокрутки
            const bgElement = document.querySelector('.app-container');
            
            // Изменяем позицию фона для создания эффекта параллакса
            bgElement.style.backgroundPosition = `center ${scrollPosition * 0.3}px`; // Чем больше коэффициент, тем медленнее движется фон
        };

        // Добавляем обработчик прокрутки
        window.addEventListener('scroll', handleScroll);

        // Убираем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);  // Пустой массив зависимостей, хук срабатывает один раз при монтировании
};

export default useMovingBackground;
