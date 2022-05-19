import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { Box } from '@mui/material';
import OrderTable from '../../components/order/OrderTable';

export type OrderPageProps = {}

const OrderPage: FC<OrderPageProps> = () => {
    return (
        <div className="reflex">
            <Box sx={{ height: 800 }}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement minSize={300}>
                        <OrderTable/>
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement minSize={300}>
                        Workboard
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </div>
    );
};

export default OrderPage;
