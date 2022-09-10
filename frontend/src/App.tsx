import React, { FC, useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Alert, Box, Snackbar } from '@mui/material';
import Header from './components/header/Header';
import NotFound from './pages/notfound/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import RequireAuth from './components/RequireAuth';
import routes from './configs/routes';
import { SnackbarContent } from './utils/snackbar/SnackbarContent';
import SnackbarsContext from './utils/snackbar/SnackbarContext';

const App: FC = () => {
    const [isLogInStarted, setIsLogInStarted] = useState(false);
    const [snackbarIsOpen, setSnackbarIsOpen] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<SnackbarContent | null>(null);
    const snackbarContextValue = useMemo(() => ({ snackbar, showSnackbar: setSnackbar }), [snackbar]);

    useEffect(() => {
        if (snackbar) {
            setSnackbarIsOpen(true);
        }
    }, [snackbar]);

    const snackbars = (
        <Snackbar open={snackbarIsOpen} autoHideDuration={3000} onClose={() => setSnackbarIsOpen(false)}>
            <Alert severity={snackbar?.severity || 'info'}>{snackbar?.text}</Alert>
        </Snackbar>
    );

    return (
        <div>
            <SnackbarsContext.Provider value={snackbarContextValue}>
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
                {snackbars}
                <Box />
            </SnackbarsContext.Provider>
        </div>
    );
};

export default App;
