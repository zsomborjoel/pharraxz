import React from 'react';
import { Box } from '@mui/material';
import DoctorOrderDetailForm from './OrderDetailForm';
import { OrderDetail } from '../../services/model/OrderDetail';
import { OrderOverview } from '../../services/model/OrderOverview';

export type OrderDetailWrapperStateProps = {
    orderDetail: OrderDetail | undefined,
    updateOrderDetail: (doctorOrderDetail: OrderDetail) => void,
    onDeleteOrderDetail: () => void,
    orderId: number | undefined,
}

type OrderDetailWrapperState = {}

class OrderDetailWrapper extends React.Component<OrderDetailWrapperStateProps, OrderDetailWrapperState> {
    shouldComponentUpdate(nextProps: Readonly<OrderDetailWrapperStateProps>, nextState: Readonly<{}>): boolean {
        const { orderDetail } = this.props;
        return orderDetail !== nextProps.orderDetail;
    }

    render(): React.ReactNode {
        const { props } = this;
        if (props.orderDetail && props.orderId) {
            return (
                <Box sx={{ height: 1 }}>
                    <DoctorOrderDetailForm orderDetail={props.orderDetail}
                        updateOrderDetail={props.updateOrderDetail}
                        onDeleteOrderDetail={props.onDeleteOrderDetail}
                        orderId={props.orderId} />
                </Box>
            );
        }
        return null;
    }
}

export default OrderDetailWrapper;
