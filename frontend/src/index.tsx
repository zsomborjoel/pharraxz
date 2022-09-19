import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
    palette: {
        primary: {
            main: '#008080',
        },
        secondary: {
            main: '#FF7F50',
        },
        text: {
            secondary: 'gray',
        },
    },
    typography: {
        fontSize: 12,
        fontFamily: '"Helvetica", "Arial", sans-serif',
    },
});

const twentySecondsInMs = 1000 * 20;
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: twentySecondsInMs,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ThemeProvider>
    </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
