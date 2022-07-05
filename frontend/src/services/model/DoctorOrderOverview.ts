import { DoctorOrderDetail } from './DoctorOrderDetail';

export interface DoctorOrderOverview {
    orderId: number;
    description: string;
    doctorOrderDetail: DoctorOrderDetail;
}
