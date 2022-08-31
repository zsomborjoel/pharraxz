import React, { FC, useState, useEffect } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import OrderService from '../../services/OrderService';
import { OrderView } from '../../services/model/OrderView';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import OrderForm from './OrderForm';
import { OrderType } from '../../services/enum/OrderType';

export type OrderPageProps = {};

const OrderPage: FC<OrderPageProps> = () => {
    const [orderViews, setOrderViews] = useState<OrderView[]>([]);
    const [sortModel] = useState<GridSortModel>([
        {
            field: 'orderId',
            sort: 'desc',
        },
    ]);

    useEffect(() => {
        OrderService.getAllOrderView().then((result) => {
            setOrderViews(result.data);
        });
    }, []);

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
            headerName: 'Order detail id',
            width: 130,
            valueGetter: (e) => e.row.id,
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
            valueGetter: (e) => OrderType[e.row.orderType as keyof typeof OrderType],
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

    return (
        <TableAndDetailsLayout
            rows={rows}
            columns={columns}
            pageUrl="/order"
            sortModelInitialState={sortModel}
            detailedView={OrderForm}
        />
    );
};

export default OrderPage;
