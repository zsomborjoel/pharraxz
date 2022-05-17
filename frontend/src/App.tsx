import React, { FC, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import NotFound from './pages/notfound/NotFoundPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import OrderPage from './pages/order/OrderPage';
import RequireAuth from './components/RequireAuth';

const App: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Routes>
                    <Route index element={(
                        <RequireAuth>
                            <HomePage/>
                        </RequireAuth>
                    )}/>
                    <Route path="/home" element={(
                        <RequireAuth>
                            <HomePage/>
                        </RequireAuth>
                    )}/>
                    <Route path="/order" element={(
                        <RequireAuth>
                            <OrderPage/>
                        </RequireAuth>
                    )}/>
                    <Route path="/login" element={(
                        <LoginPage setIsLoggedIn={setIsLoggedIn}/>
                    )}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
