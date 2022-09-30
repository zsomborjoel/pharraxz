import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import ProductForm from './ProductForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useGetAllProduct } from '../../queries/ProductQuery';
import { useGetAllSupplier } from '../../queries/SupplierQuery';
import { useGetAllReleaseAbleCode } from '../../queries/ReleaseAbleCodeQuery';
import MapperUtil from '../../utils/MapperUtil';

export type ProductPageProps = {};

const ProductPage: FC<ProductPageProps> = (): any => {
    const { data: products } = useGetAllProduct();
    const { data: suppliers } = useGetAllSupplier();
    const { data: releaseAbleCodes } = useGetAllReleaseAbleCode();

    const getReleaseAbleCodeDesc = (e: any): any => {
        if (e.row.releasableBy === null) {
            return 'Unkown';
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
            renderCell: (e) => (
                <Tooltip title={e.row.atc_description}>
                    <span>{e.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'supplierId',
            headerName: 'Supplier',
            width: 130,
            valueGetter: (e) => MapperUtil.getEntityNameById(suppliers!, e.row.supplierId),
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
            renderCell: (e) => (
                <Tooltip title={getReleaseAbleCodeDesc(e)}>
                    <span>{e.value}</span>
                </Tooltip>
            ),
        },
    ];

    if (products === undefined || suppliers === undefined || releaseAbleCodes === undefined) {
        return <LoadingIndicator loading />;
    }

    return <TableAndDetailsLayout rows={rows!} columns={columns} pageUrl="/product" detailedView={ProductForm} />;
};

export default ProductPage;
