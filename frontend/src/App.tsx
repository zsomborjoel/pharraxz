import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header/Header';
import NotFound from './pages/notfound/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import RequireAuth from './components/RequireAuth';
import routes from './configs/routes';

const App: FC = () => {
    const [isLogInStarted, setIsLogInStarted] = useState(false);

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }} />
            <Router>
                <Header isLogInStarted={isLogInStarted} setIsLogInStarted={setIsLogInStarted} />
                <Routes>
                    {routes.map(({ path, element }) => (
                        <Route path={path} element={<RequireAuth>{element}</RequireAuth>} />
                    ))}
                    <Route path="/login" element={<LoginPage setIsLogInStarted={setIsLogInStarted} />} />
                    <Route element={<NotFound />} />
                </Routes>
            </Router>
            <Box />
        </div>
    );
};

export default App;
