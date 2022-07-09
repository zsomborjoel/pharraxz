import React, { FC, useState } from 'react';

import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { DoctorOrderOverview } from '../../services/model/DoctorOrderOverview';
import { DoctorOrderDetail } from '../../services/model/DoctorOrderDetail';

export type DoctorOrderTableProps = {
    doctorOrderOverviews: DoctorOrderOverview[],
    selectedOrderDetailId: string | undefined,
    loading: boolean
}

const DoctorOrderTable: FC<DoctorOrderTableProps> = (
    {
        doctorOrderOverviews,
        selectedOrderDetailId,
        loading,
    },
) => {
    const rows = doctorOrderOverviews;

    const columns: GridColDef[] = [
        {
            field: 'doctorOrderDetail.orderDetailId',
            headerName: 'Sub order id',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.orderDetailId,
        },
        {
            field: 'doctorOrderDetail.product.name',
            headerName: 'Medicine name',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.product.name,
        },
        {
            field: 'doctorOrderDetail.product.registerNumber',
            headerName: 'Register number',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.product.registerNumber,
        },
        {
            field: 'doctorOrderDetail.product.packaging',
            headerName: 'Packaging',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.product.packaging,
        },
        {
            field: 'doctorOrderDetail.product.description',
            headerName: 'Medicie description',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.product.description,
        },
        {
            field: 'doctorOrderDetail.product.inn',
            headerName: 'Inn',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.product.inn,
        },
        {
            field: 'doctorOrderDetail.product.releasable',
            headerName: 'Releasable',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.product.releasable,
        },
        {
            field: 'doctorOrderDetail.quantity',
            headerName: 'Quantity',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.quantity,
        },
        {
            field: 'doctorOrderDetail.oderType',
            headerName: 'Oder type',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.oderType,
        },
        {
            field: 'doctorOrderDetail.startDate',
            headerName: 'Order start date',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.startDate,
        },
        {
            field: 'doctorOrderDetail.endDate',
            headerName: 'Order end date',
            width: 130,
            valueGetter: (e) => e.row.doctorOrderDetail.endDate,
        },
    ];

    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid getRowId={(row) => row.doctorOrderDetail.orderDetailId}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                autoHeight
            />
        </div>
    );
};

export default React.memo(DoctorOrderTable);
