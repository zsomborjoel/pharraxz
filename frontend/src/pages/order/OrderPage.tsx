import React, { FC, useState } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import OrderForm from './OrderForm';
import { OrderType } from '../../services/enum/OrderType';
import { useGetAllOrder } from '../../queries/OrderQuery';
import LoadingIndicator from '../../components/LoadingIndicator';
import DateFilterOperator from '../../components/grid-operators/DateFilterOperator';
import OrderTypeOperator from '../../components/grid-operators/OrderTypeOperator';
import { OrderView } from '../../services/model/OrderView';
import AuthService from '../../services/AuthService';
import { RoleName } from '../../services/enum/RoleName';

export type OrderPageProps = {};

const OrderPage: FC<OrderPageProps> = (): any => {
    const { data } = useGetAllOrder();

    const getRoleAssingedOrderViews = (): OrderView[] | undefined => {
        const currentUser = AuthService.getCurrentUser();
        const requiredUserRoles = [RoleName.ROLE_ADMIN];

        if (!AuthService.hasUserValidRole(requiredUserRoles)) {
            if (currentUser?.userId) {
                return data?.filter((orderView) => orderView.userId === currentUser?.userId);
            }
        }

        return data;
    };

    const orderViews = getRoleAssingedOrderViews();

    const [sortModel] = useState<GridSortModel>([
        {
            field: 'orderId',
            sort: 'desc',
        },
    ]);

    const rows = orderViews;

    const columns: GridColDef[] = [
        {
            field: 'orderId',
            headerName: 'Order id',
            width: 130,
            type: 'number',
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 130,
        },
        {
            field: 'orderDetailId',
            headerName: 'Order detail id',
            width: 130,
            valueGetter: (e) => e.row.id,
            type: 'number',
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
            type: 'boolean',
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 130,
            type: 'number',
        },
        {
            field: 'oderType',
            headerName: 'Oder type',
            width: 130,
            valueGetter: (e) => OrderType[e.row.orderType as keyof typeof OrderType],
            filterOperators: OrderTypeOperator,
        },
        {
            field: 'startDate',
            headerName: 'Order start date',
            width: 130,
            filterOperators: DateFilterOperator(),
        },
        {
            field: 'endDate',
            headerName: 'Order end date',
            width: 130,
            filterOperators: DateFilterOperator(),
        },
    ];

    if (orderViews === undefined) {
        return <LoadingIndicator loading />;
    }

    return (
        <TableAndDetailsLayout
            rows={rows!}
            columns={columns}
            pageUrl="/order"
            sortModelInitialState={sortModel}
            detailedView={OrderForm}
        />
    );
};

export default OrderPage;
