import React, { FC, useState } from 'react';

import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { DoctorOrderOverview } from '../../services/model/DoctorOrderOverview';
import { DoctorOrderDetail } from '../../services/model/DoctorOrderDetail';

export type DcotorOrderTableProps = {
    doctorOrderOverviews: DoctorOrderOverview[],
    selectedOrderDetailId: string | undefined,
    loading: boolean
}

const DoctorOrderTable: FC<DcotorOrderTableProps> = (
    {
        doctorOrderOverviews,
        selectedOrderDetailId,
        loading,
    },
) => {
    const columns: GridColDef[] = [
        { field: 'doctorOrderDetail.orderDetailId', headerName: 'Sub order id', width: 130 },
        { field: 'doctorOrderDetail.product.name', headerName: 'Medicine name', width: 130 },
        { field: 'doctorOrderDetail.product.registerNumber', headerName: 'Register number', width: 130 },
        { field: 'doctorOrderDetail.product.packaging', headerName: 'Packaging', width: 130 },
        { field: 'doctorOrderDetail.product.description', headerName: 'Medicie description', width: 130 },
        { field: 'doctorOrderDetail.product.inn', headerName: 'Inn', width: 130 },
        { field: 'doctorOrderDetail.product.releasable', headerName: 'Releasable', width: 130 },
        { field: 'doctorOrderDetail.quantity', headerName: 'Quantity', width: 130 },
        { field: 'doctorOrderDetail.oderType', headerName: 'Oder type', width: 130 },
        { field: 'doctorOrderDetail.startDate', headerName: 'Order start date', width: 130 },
        { field: 'doctorOrderDetail.endDate', headerName: 'Order end date', width: 130 },
    ];

    console.log(doctorOrderOverviews);
    const rows = doctorOrderOverviews;

    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={rows}
                getRowId={(row) => row.doctorOrderDetail.orderDetailId}
                columns={columns}
                pageSize={30}
                rowsPerPageOptions={[5]}
                checkboxSelection
                autoHeight
            />
        </div>
    );
};

export default React.memo(DoctorOrderTable);
