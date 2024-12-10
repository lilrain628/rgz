// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import UploadVideo from './components/UploadVideo';
import VideoList from './components/VideoList';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import { UserProvider } from './context/UserContext';
import VideoDetail from './components/VideoDetail';
import './App.css';
import useMovingBackground from './hooks/useMovingBackground';

const App = () => {
    useMovingBackground(); // Применяем хук для параллакса на всех страницах
    
    return (
        <UserProvider>
            <Router>
                <div className="app-container"> {/* Весь контент будет в этом контейнере */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Auth />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/upload" element={<PrivateRoute element={<UploadVideo />} />} />
                        <Route path="/videos" element={<VideoList />} />
                        <Route path="/video/:id" element={<VideoDetail />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;
