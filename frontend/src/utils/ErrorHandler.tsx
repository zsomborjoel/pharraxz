import { useContext } from 'react';
import SnackbarContext from '../contexts/snackbar/SnackbarContext';

export const handleError = (error: string): void => {
    const { showSnackbar } = useContext(SnackbarContext);

    if (error) {
        showSnackbar({ severity: 'error', text: error });
    } else {
        showSnackbar({ severity: 'error', text: 'Unexpected error!' });
    }
};
