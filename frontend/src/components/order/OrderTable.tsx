import React, { FC, useState, useEffect } from 'react';

import { DataGrid, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import DataGridUtil from '../../utils/DataGridUtil';
import { OrderView } from '../../services/model/OrderView';

export type OrderTableProps = {
    orderViews: OrderView[];
    selectedOrderDetailId: number | undefined;
    selectOrderDetail: (orderDetailId: number) => void;
    loading: boolean;
};

const OrderTable: FC<OrderTableProps> = ({ orderViews, selectedOrderDetailId, selectOrderDetail, loading }) => {
    const rows = orderViews;

    const columns: GridColDef[] = [
        {
            field: 'orderId',
            headerName: 'Order id',
            width: 130,
            valueGetter: (e) => e.row.orderId,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 130,
            valueGetter: (e) => e.row.description,
        },
        {
            field: 'orderDetailId',
            headerName: 'Sub order id',
            width: 130,
            valueGetter: (e) => e.row.orderDetailId,
        },
        {
            field: 'product.name',
            headerName: 'Medicine name',
            width: 130,
            valueGetter: (e) => e.row.product.name,
        },
        {
            field: 'product.atc',
            headerName: 'Atc',
            width: 130,
            valueGetter: (e) => e.row.product.atc,
        },
        {
            field: 'product.registerNumber',
            headerName: 'Register number',
            width: 130,
            valueGetter: (e) => e.row.product.registerNumber,
        },
        {
            field: 'product.packaging',
            headerName: 'Packaging',
            width: 130,
            valueGetter: (e) => e.row.product.packaging,
        },
        {
            field: 'product.inn',
            headerName: 'Inn',
            width: 130,
            valueGetter: (e) => e.row.product.inn,
        },
        {
            field: 'product.releasable',
            headerName: 'Releasable',
            width: 130,
            valueGetter: (e) => e.row.product.releasable,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 130,
            valueGetter: (e) => e.row.quantity,
        },
        {
            field: 'oderType',
            headerName: 'Oder type',
            width: 130,
            valueGetter: (e) => e.row.oderType,
        },
        {
            field: 'startDate',
            headerName: 'Order start date',
            width: 130,
            valueGetter: (e) => e.row.startDate,
        },
        {
            field: 'endDate',
            headerName: 'Order end date',
            width: 130,
            valueGetter: (e) => e.row.endDate,
        },
    ];

    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: 'orderDetailId',
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
            <DataGrid
                getRowId={(row) => row.orderDetailId}
                rows={rows}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[100]}
                onRowClick={(params) => selectOrderDetail(params.row.orderDetailId)}
                sortModel={sortModel}
                selectionModel={selectionModel}
                onSelectionModelChange={(sel) => setSelectionModel(sel)}
                loading={loading}
                autoHeight
            />
        </div>
    );
};

export default React.memo(OrderTable);
