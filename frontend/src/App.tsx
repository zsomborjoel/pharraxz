import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header/Header';
import NotFound from './pages/notfound/NotFoundPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import OrderPage from './pages/order/OrderPage';
import RequireAuth from './components/RequireAuth';

const App: FC = () => {
    const [isLogInStarted, setIsLogInStarted] = useState(false);

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }} />
            <Router>
                <Header isLogInStarted={isLogInStarted} setIsLogInStarted={setIsLogInStarted} />
                <Routes>
                    <Route
                        index
                        element={(
                            <RequireAuth>
                                <HomePage />
                            </RequireAuth>
                    )}
                    />
                    <Route
                        path="/home"
                        element={(
                            <RequireAuth>
                                <HomePage />
                            </RequireAuth>
                    )}
                    />
                    <Route
                        path="/order"
                        element={(
                            <RequireAuth>
                                <OrderPage />
                            </RequireAuth>
                    )}
                    />
                    <Route
                        path="/login"
                        element={(
                            <LoginPage setIsLogInStarted={setIsLogInStarted} />
                    )}
                    />
                    <Route element={<NotFound />} />
                </Routes>
            </Router>
            <Box/>
        </div>
    );
};

export default App;
