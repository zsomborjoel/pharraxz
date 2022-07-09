import { DoctorOrderDetail } from './DoctorOrderDetail';

export interface DoctorOrderOverview {
    id: string;
    orderId: number;
    description: string;
    doctorOrderDetail: DoctorOrderDetail;
}
