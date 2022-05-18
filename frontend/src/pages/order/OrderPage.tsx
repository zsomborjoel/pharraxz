import React, { FC } from 'react';
import 'react-reflex/styles.css';
import './styles.css';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { Box } from '@mui/material';

export type OrderPageProps = {}

const OrderPage: FC<OrderPageProps> = () => {
    return (
        <ReflexContainer orientation="vertical">

            <ReflexElement className="left-pane">
                <div className="pane-content">
                    Left Pane (resizable)
                </div>
            </ReflexElement>

            <ReflexSplitter/>

            <ReflexElement className="right-pane">
                <div className="pane-content">
                    Right Pane (resizable)
                </div>
            </ReflexElement>

        </ReflexContainer>
    );
};

export default OrderPage;
