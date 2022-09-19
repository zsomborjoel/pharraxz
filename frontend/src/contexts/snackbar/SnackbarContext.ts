import React, { createContext } from 'react';
import { SnackbarContent } from './SnackbarContent';

interface SnackbarContextInterface {
    snackbar: SnackbarContent | null;
    showSnackbar: React.Dispatch<React.SetStateAction<SnackbarContent | null>>;
}

const SnackbarsContext = createContext<SnackbarContextInterface>({
    snackbar: null,
    showSnackbar: () => {},
});

export default SnackbarsContext;
