import { CircularProgress } from '@mui/material';
import React, { FC } from 'react';

export type LoadingIndicatorProps = {
    loading: boolean;
};

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ loading }) => {
    if (loading) {
        return <CircularProgress sx={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto' }} />;
    }

    return null;
};

export default LoadingIndicator;
