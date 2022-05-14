import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import NotFound from './pages/notfound/NotFoundPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import OrderPage from './pages/order/OrderPage';
import RequireAuth from './components/RequireAuth';

const App: FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/order" element={(
                        <RequireAuth>
                            <OrderPage/>
                        </RequireAuth>
                    )}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
