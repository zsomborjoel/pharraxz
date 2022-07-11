import React from 'react';
import { Box } from '@mui/material';
import DoctorOrderDetailForm from './DoctorOrderDetailForm';
import { OrderDetail } from '../../services/model/OrderDetail';

export type DoctorOrderDetailWrapperProps = {
    doctorOrderDetail: OrderDetail | undefined,
    updateDoctorOrderDetail: (doctorOrderDetail: OrderDetail) => void,
    onDeleteDoctorOrderDetail: () => void,
    doctorOrderDetailId: number | undefined,
}

type DoctorOrderDetailWrapperState = {}

class DoctorOrderDetailWrapper extends React.Component<DoctorOrderDetailWrapperProps, DoctorOrderDetailWrapperState> {
    shouldComponentUpdate(nextProps: Readonly<DoctorOrderDetailWrapperProps>, nextState: Readonly<{}>): boolean {
        const { doctorOrderDetail } = this.props;
        return doctorOrderDetail !== nextProps.doctorOrderDetail;
    }

    render(): React.ReactNode {
        const { props } = this;
        if (props.doctorOrderDetail && props.doctorOrderDetailId) {
            return (
                <Box sx={{ height: 1 }}>
                    <DoctorOrderDetailForm doctorOrderDetail={props.doctorOrderDetail}
                        updateDoctorOrderDetail={props.updateDoctorOrderDetail}
                        onDeleteDoctorOrderDetail={props.onDeleteDoctorOrderDetail}
                        doctorOrderDetailId={props.doctorOrderDetailId} />
                </Box>
            );
        }
        return null;
    }
}

export default DoctorOrderDetail;
