import React, { FC, useState, useEffect } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';
import { OrderOverview } from '../../services/model/OrderOverview';
import OrderService from '../../services/OrderService';
import { OrderDetail } from '../../services/model/OrderDetail';
import OrderTable from '../../components/order/OrderTable';
import { OrderView } from '../../services/model/OrderView';

export type OrderPageProps = {}

const OrderPage: FC<OrderPageProps> = () => {
    const [loadingDoctorOrders, setLoadingDoctorOrders] = useState<boolean>(false);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetail>();
    const [selectedOrderDetailId, setSelectedOrderDetailId] = useState<string>();
    const [orderOverviews, setOrderOverviews] = useState<OrderOverview[]>([]);
    const [orderViews, setOrderViews] = useState<OrderView[]>([]);

    const navigate = useNavigate();

    const selectOrderDetail = (id: number): void => {
    };

    useEffect(() => {
        setLoadingDoctorOrders(true);
        OrderService.getAllOrderOverview().then((result) => {
            setOrderOverviews(result.data);
        });
    }, []);

    useEffect(() => {
        if (orderOverviews.length > 0) {
            const orderViewsNew = [] as OrderView[];
            orderOverviews.forEach((orderOverview) => {
                orderOverview.orderDetails.forEach((orderDetail) => {
                    const orderViewNew = {} as OrderView;

                    orderViewNew.orderId = orderOverview.orderId;
                    orderViewNew.description = orderOverview.description;
                    orderViewNew.orderDetailId = orderDetail.orderDetailId;
                    orderViewNew.product = orderDetail.product;
                    orderViewNew.quantity = orderDetail.quantity;
                    orderViewNew.oderType = orderDetail.oderType;
                    orderViewNew.startDate = orderDetail.startDate;
                    orderViewNew.endDate = orderDetail.endDate;

                    orderViewsNew.push(orderViewNew);
                });
            });

            setOrderViews(orderViewsNew);
            setLoadingDoctorOrders(false);
        }
    }, [orderOverviews]);

    return (
        <div className="reflex">
            <Box sx={{ height: 800 }}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement minSize={300}>
                        <OrderTable orderViews={orderViews}
                            selectedOrderDetailId={selectedOrderDetailId}
                            selectOrderDetail={selectOrderDetail}
                            loading={loadingDoctorOrders}/>
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement minSize={300}>
                        Something
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </div>
    );
};

export default OrderPage;
