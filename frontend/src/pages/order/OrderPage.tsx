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
import OrderFormWrapper from '../../components/order/OrderFormWrapper';

export type OrderPageProps = {}

const OrderPage: FC<OrderPageProps> = () => {
    const [loadingDoctorOrders, setLoadingDoctorOrders] = useState<boolean>(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number>();
    const [selectedOrderView, setSelectedOrderView] = useState<OrderView>();
    const [selectedOrderDetailId, setSelectedOrderDetailId] = useState<number>();
    const [orderOverviews, setOrderOverviews] = useState<OrderOverview[]>([]);
    const [orderViews, setOrderViews] = useState<OrderView[]>([]);
    const [orderViewsMap, setOrderViewsMap] = useState(new Map());

    const selectOrderDetail = (id: number): void => {
        setSelectedOrderView(orderViewsMap.get(id));
    };

    const updateOrderDetail = (orderDetail: OrderDetail): void => {
    };

    const refreshPage = (): void => {
        if (orderOverviews.length > 0) {
            const orderViewsNew = [] as OrderView[];
            const orderViewsNewMap = new Map();
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
                    orderViewsNewMap.set(orderDetail.orderDetailId, orderViewNew);

                    setSelectedOrderDetailId(orderDetail.orderDetailId);
                });
                setSelectedOrderId(orderOverview.orderId);
            });

            setOrderViews(orderViewsNew);
            setOrderViewsMap(orderViewsNewMap);
            setLoadingDoctorOrders(false);
        }
    };

    const onDeleteOrderDetail = (): void => {
        refreshPage();
    };

    useEffect(() => {
        setLoadingDoctorOrders(true);
        OrderService.getAllOrderOverview().then((result) => {
            setOrderOverviews(result.data);
        });
    }, []);

    useEffect(() => {
        refreshPage();
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
                        <OrderFormWrapper orderView={selectedOrderView}
                            updateOrderDetail={updateOrderDetail}
                            onDeleteOrderDetail={onDeleteOrderDetail}
                            orderDetailId={selectedOrderDetailId}/>
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </div>
    );
};

export default OrderPage;
