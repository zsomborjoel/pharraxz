import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef } from '@mui/x-data-grid';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import ProductForm from './ProductForm';
import { Supplier } from '../../services/model/Supplier';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useGetAllProduct } from '../../queries/ProductQuery';
import { useGetAllSupplier } from '../../queries/SupplierQuery';
import { Product } from '../../services/model/Product';

export type OrderPageProps = {};

const OrderPage: FC<OrderPageProps> = (): any => {
    const { isLoading: isLoadingProducts, isFetching: isFetchingProducts, data: products } = useGetAllProduct();
    const { isLoading: isLoadingSuppliers, isFetching: isFetchingSuppliers, data: suppliers } = useGetAllSupplier();

    if (isLoadingProducts || isFetchingProducts || isLoadingSuppliers || isFetchingSuppliers) {
        return <LoadingIndicator loading />;
    }

    const getSupplierName = (suppliers: Supplier[], e: any): any => {
        if (e.row.supplierId === null) {
            return null;
        }

        return suppliers.find((supplier) => supplier.id === e.row.supplierId)?.name;
    };

    const getProductsWithId = (): Product[] => products!.map((product) => ({ ...product, id: product.name }));

    const rows = getProductsWithId();

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 255,
        },
        {
            field: 'atc',
            headerName: 'Atc code',
            width: 130,
        },
        {
            field: 'supplierId',
            headerName: 'Supplier',
            width: 130,
            valueGetter: (e) => getSupplierName(suppliers!, e),
        },
        {
            field: 'packaging',
            headerName: 'Packaging',
            width: 255,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 255,
        },
        {
            field: 'distributor',
            headerName: 'Distributor',
            width: 255,
        },
        {
            field: 'inn',
            headerName: 'Inn',
            width: 130,
        },
        {
            field: 'releasable',
            headerName: 'Releasable',
            width: 130,
            type: 'boolean',
        },
        {
            field: 'releasableBy',
            headerName: 'Releasable By',
            width: 130,
        },
    ];

    return <TableAndDetailsLayout rows={rows} columns={columns} pageUrl="/product" detailedView={ProductForm} />;
};

export default OrderPage;
