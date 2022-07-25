import React from 'react';
import { Box } from '@mui/material';
import OrderForm from './OrderForm';
import { OrderDetail } from '../../services/model/OrderDetail';
import { OrderOverview } from '../../services/model/OrderOverview';
import { OrderView } from '../../services/model/OrderView';

export type OrderFormWapperProps = {
    orderView: OrderView | undefined;
    updateOrderDetail: (orderDetail: OrderDetail) => void;
    onDeleteOrderDetail: () => void;
    orderDetailId: number | undefined;
};

type OrderFormWrapperState = {};

class OrderFormWrapper extends React.Component<OrderFormWapperProps, OrderFormWrapperState> {
    shouldComponentUpdate(nextProps: Readonly<OrderFormWapperProps>, nextState: Readonly<{}>): boolean {
        const { orderView } = this.props;
        return orderView !== nextProps.orderView;
    }

    render(): React.ReactNode {
        const { props } = this;
        if (props.orderView && props.orderDetailId) {
            return (
                <Box sx={{ height: 1 }}>
                    <OrderForm
                        orderView={props.orderView}
                        updateOrderDetail={props.updateOrderDetail}
                        onDeleteOrderDetail={props.onDeleteOrderDetail}
                        orderDetailIdProp={props.orderDetailId}
                    />
                </Box>
            );
        }
        return null;
    }
}

export default OrderFormWrapper;
