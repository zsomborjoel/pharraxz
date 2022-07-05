import React, { FC, useState, useEffect } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { Box } from '@mui/material';
import DoctorOrderTable from '../../components/order/DoctorOrderTable';
import LoadingIndicator from '../../components/LoadingIndicator';
import { DoctorOrderOverview } from '../../services/model/DoctorOrderOverview';
import OrderService from '../../services/OrderService';

export type DoctorOrderPageProps = {}

const DoctorOrderPage: FC<DoctorOrderPageProps> = () => {
    const [loadingDoctorOrders, setLoadingDoctorOrders] = useState<boolean>(false);
    const [selectedDoctorOrderOverview, setSelectedDoctorOrderOverview] = useState<DoctorOrderOverview>();
    const [selectedOrderDetailId, setSelectedOrderDetailId] = useState<string>();
    const [doctorOrderOverviews, setDoctorOrderOverviews] = useState<DoctorOrderOverview[]>([]);

    useEffect(() => {
        OrderService.getAllDoctorOrderOverview().then((result) => {
            setDoctorOrderOverviews(result.data);
            setLoadingDoctorOrders(false);
        });
    }, []);

    return (
        <div className="reflex">
            <Box sx={{ height: 800 }}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement minSize={300}>
                        <DoctorOrderTable doctorOrderOverviews={doctorOrderOverviews}
                            selectedOrderDetailId={selectedOrderDetailId}
                            loading={false}/>
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
