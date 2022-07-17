import React, { FC, useState, useEffect } from 'react';

import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel, GridSortModel, useGridApiRef } from '@mui/x-data-grid';
import { OrderOverview } from '../../services/model/OrderOverview';
import { OrderDetail } from '../../services/model/OrderDetail';
import DataGridUtil from '../../utils/DataGridUtil';

export type DoctorOrderTableProps = {
    orderOverviews: OrderOverview[],
    selectedOrderDetailId: string | undefined,
    selectOrderDetail: (orderDetailId: number) => void,
    loading: boolean
}

const OrderTable: FC<DoctorOrderTableProps> = (
    {
        orderOverviews,
        selectedOrderDetailId,
        selectOrderDetail,
        loading,
    },
) => {
    const rows = orderOverviews;

    const columns: GridColDef[] = [
        {
            field: 'orderDetail.orderDetailId',
            headerName: 'Sub order id',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.orderDetailId,
        },
        {
            field: 'orderDetail.product.name',
            headerName: 'Medicine name',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.product.name,
        },
        {
            field: 'orderDetail.product.registerNumber',
            headerName: 'Register number',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.product.registerNumber,
        },
        {
            field: 'orderDetail.product.packaging',
            headerName: 'Packaging',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.product.packaging,
        },
        {
            field: 'orderDetail.product.description',
            headerName: 'Medicie description',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.product.description,
        },
        {
            field: 'orderDetail.product.inn',
            headerName: 'Inn',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.product.inn,
        },
        {
            field: 'orderDetail.product.releasable',
            headerName: 'Releasable',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.product.releasable,
        },
        {
            field: 'orderDetail.quantity',
            headerName: 'Quantity',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.quantity,
        },
        {
            field: 'orderDetail.oderType',
            headerName: 'Oder type',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.oderType,
        },
        {
            field: 'orderDetail.startDate',
            headerName: 'Order start date',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.startDate,
        },
        {
            field: 'orderDetail.endDate',
            headerName: 'Order end date',
            width: 130,
            valueGetter: (e) => e.row.orderDetail.endDate,
        },
    ];

    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: 'orderDetail.orderDetailId',
            sort: 'desc',
        },
    ]);

    DataGridUtil.selectFirst(selectedOrderDetailId, rows[rows.length - 1], selectionModel, setSelectionModel, selectOrderDetail);

    useEffect(() => {
        setSelectionModel([]);
        DataGridUtil.selectFirst(selectedOrderDetailId, selectedOrderDetailId, selectionModel, setSelectionModel, selectOrderDetail);
    }, [selectedOrderDetailId]);

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid getRowId={(row) => row.orderDetail.orderDetailId}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={(params) => selectOrderDetail(params.row.id)}
                sortModel={sortModel}
                selectionModel={selectionModel}
                onSelectionModelChange={(sel) => setSelectionModel(sel)}
                loading={loading}
                checkboxSelection
                autoHeight
            />
        </div>
    );
};

export default React.memo(OrderTable);
