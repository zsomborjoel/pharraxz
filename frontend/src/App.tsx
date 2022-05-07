import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import NotFound from './components/NotFound';
import Login from './components/Login';

const App: FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
