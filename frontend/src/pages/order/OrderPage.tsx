import React, { FC, useState, useEffect } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import OrderService from '../../services/OrderService';
import { OrderView } from '../../services/model/OrderView';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import OrderForm from '../../components/order/OrderForm';

export type OrderPageProps = {};

const OrderPage: FC<OrderPageProps> = () => {
    const [orderViews, setOrderViews] = useState<OrderView[]>([]);
    const [sortModel] = useState<GridSortModel>([
        {
            field: 'orderId',
            sort: 'desc',
        },
    ]);

    const getOrders = (): void => {
        OrderService.getAllOrderView().then((result) => {
            setOrderViews(result.data);
        });
    };

    useEffect(() => {
        getOrders();
    }, []);

    const rows = orderViews;

    const columns: GridColDef[] = [
        {
            field: 'orderId',
            headerName: 'Order id',
            width: 130,
            valueGetter: (e: { row: { orderId: any; }; }) => e.row.orderId,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 130,
            valueGetter: (e: { row: { description: any; }; }) => e.row.description,
        },
        {
            field: 'orderDetailId',
            headerName: 'Order detail id',
            width: 130,
            valueGetter: (e: { row: { id: any; }; }) => e.row.id,
        },
        {
            field: 'product.name',
            headerName: 'Medicine name',
            width: 130,
            valueGetter: (e: { row: { product: { name: any; }; }; }) => e.row.product.name,
        },
        {
            field: 'product.atc',
            headerName: 'Atc',
            width: 130,
            valueGetter: (e: { row: { product: { atc: any; }; }; }) => e.row.product.atc,
        },
        {
            field: 'product.registerNumber',
            headerName: 'Register number',
            width: 130,
            valueGetter: (e: { row: { product: { registerNumber: any; }; }; }) => e.row.product.registerNumber,
        },
        {
            field: 'product.packaging',
            headerName: 'Packaging',
            width: 130,
            valueGetter: (e: { row: { product: { packaging: any; }; }; }) => e.row.product.packaging,
        },
        {
            field: 'product.inn',
            headerName: 'Inn',
            width: 130,
            valueGetter: (e: { row: { product: { inn: any; }; }; }) => e.row.product.inn,
        },
        {
            field: 'product.releasable',
            headerName: 'Releasable',
            width: 130,
            valueGetter: (e: { row: { product: { releasable: any; }; }; }) => e.row.product.releasable,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 130,
            valueGetter: (e: { row: { quantity: any; }; }) => e.row.quantity,
        },
        {
            field: 'oderType',
            headerName: 'Oder type',
            width: 130,
            valueGetter: (e: { row: { oderType: any; }; }) => e.row.oderType,
        },
        {
            field: 'startDate',
            headerName: 'Order start date',
            width: 130,
            valueGetter: (e: { row: { startDate: any; }; }) => e.row.startDate,
        },
        {
            field: 'endDate',
            headerName: 'Order end date',
            width: 130,
            valueGetter: (e: { row: { endDate: any; }; }) => e.row.endDate,
        },
    ];

    return (<TableAndDetailsLayout
        rows={rows}
        columns={columns}
        pageUrl='/order'
        sortModelInitialState={sortModel}
        detailedView={OrderForm}
    />);
};

export default OrderPage;
