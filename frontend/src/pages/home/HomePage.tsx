import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

export type HomePageProps = {};

const HomePage: FC<HomePageProps> = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h3">Welcome!</Typography>
    </Box>
);

export default HomePage;
