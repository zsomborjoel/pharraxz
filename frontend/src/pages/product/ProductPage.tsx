import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef } from '@mui/x-data-grid';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import ProductForm from './ProductForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useGetAllProduct } from '../../queries/ProductQuery';
import { useGetAllSupplier } from '../../queries/SupplierQuery';
import { useGetAllReleaseAbleCode } from '../../queries/ReleaseAbleCodeQuery';

export type ProductPageProps = {};

const ProductPage: FC<ProductPageProps> = (): any => {
    const { isLoading: isLoadingProducts, isFetching: isFetchingProducts, data: products } = useGetAllProduct();
    const { isLoading: isLoadingSuppliers, isFetching: isFetchingSuppliers, data: suppliers } = useGetAllSupplier();
    const {
        isLoading: isLoadingReleaseAbleCodes,
        isFetching: isFetchingReleaseAbleCodes,
        data: releaseAbleCodes,
    } = useGetAllReleaseAbleCode();

    const getSupplierName = (e: any): any => {
        if (e.row.supplierId === null) {
            return null;
        }

        return suppliers?.find((supplier) => supplier.id === e.row.supplierId)?.name;
    };

    const getReleaseAbleCodeDesc = (e: any): any => {
        if (e.row.releasableBy === null) {
            return null;
        }

        return releaseAbleCodes?.find((releaseAbleCode) => releaseAbleCode.code === e.row.releasableBy)?.description;
    };

    const rows = products;

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
            valueGetter: (e) => getSupplierName(e),
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
            width: 1005,
            valueGetter: (e) => `${e.value} - (${getReleaseAbleCodeDesc(e)})`,
        },
    ];

    if (
        isLoadingProducts &&
        isFetchingProducts &&
        isLoadingSuppliers &&
        isFetchingSuppliers &&
        isLoadingReleaseAbleCodes &&
        isFetchingReleaseAbleCodes
    ) {
        return <LoadingIndicator loading />;
    }

    return (
        <TableAndDetailsLayout rows={rows ?? [{}]} columns={columns} pageUrl="/product" detailedView={ProductForm} />
    );
};

export default ProductPage;
