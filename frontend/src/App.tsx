import React, { FC, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header/Header';
import NotFound from './pages/notfound/NotFoundPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import OrderPage from './pages/order/OrderPage';
import RequireAuth from './components/RequireAuth';

const App: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }} />
            <Router>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Box sx={{ mt: 2, mx: 1, mb: 1, flexGrow: 1, overflow: 'hidden' }} />
                <Routes>
                    <Route index element={(
                        <RequireAuth>
                            <HomePage />
                        </RequireAuth>
                    )} />
                    <Route path="/home" element={(
                        <RequireAuth>
                            <HomePage />
                        </RequireAuth>
                    )} />
                    <Route path="/order" element={(
                        <RequireAuth>
                            <OrderPage />
                        </RequireAuth>
                    )} />
                    <Route path="/login" element={(
                        <LoginPage setIsLoggedIn={setIsLoggedIn} />
                    )} />
                    <Route element={<NotFound />} />
                </Routes>
                <Box/>
            </Router>
            <Box/>
        </div>
    );
};

export default App;
