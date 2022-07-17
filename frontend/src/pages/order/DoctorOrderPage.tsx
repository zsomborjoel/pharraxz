import React, { FC, useState, useEffect } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DoctorOrderTable from '../../components/order/OrderTable';
import LoadingIndicator from '../../components/LoadingIndicator';
import { OrderOverview } from '../../services/model/OrderOverview';
import OrderService from '../../services/OrderService';
import { OrderDetail } from '../../services/model/OrderDetail';

export type DoctorOrderPageProps = {}

const DoctorOrderPage: FC<DoctorOrderPageProps> = () => {
    const [loadingDoctorOrders, setLoadingDoctorOrders] = useState<boolean>(false);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetail>();
    const [selectedOrderDetailId, setSelectedOrderDetailId] = useState<string>();
    const [orderOverviews, setOrderOverviews] = useState<OrderOverview[]>([]);
    const navigate = useNavigate();

    const selectOrderDetail = (id: number): void => {
        navigate(`/${id}`);
    };

    useEffect(() => {
        setLoadingDoctorOrders(true);
        OrderService.getAllOrderOverview().then((result) => {
            setOrderOverviews(result);
            setLoadingDoctorOrders(false);
        });
    }, []);

    return (
        <div className="reflex">
            <Box sx={{ height: 800 }}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement minSize={300}>
                        <DoctorOrderTable orderOverviews={orderOverviews}
                            selectedOrderDetailId={selectedOrderDetailId}
                            selectOrderDetail={selectOrderDetail}
                            loading={loadingDoctorOrders}/>
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement minSize={300}>
                        <LoadingIndicator loading={false}/>
                        Something
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </div>
    );
};

export default DoctorOrderPage;
