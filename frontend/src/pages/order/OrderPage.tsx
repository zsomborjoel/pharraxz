import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { Box } from '@mui/material';

export type OrderPageProps = {}

const OrderPage: FC<OrderPageProps> = () => {
    return (
        <div className="demo">
            <ReflexContainer orientation="vertical">
                <ReflexElement flex={0.25} minSize={100}>
                    Hi
                </ReflexElement>

                <ReflexSplitter />

                <ReflexElement minSize={50}>
                    Workboard
                </ReflexElement>
            </ReflexContainer>
        </div>
    );
};

export default OrderPage;
