import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef } from '@mui/x-data-grid';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useGetAllHospitalWard } from '../../queries/HospitalWardQuery';
import { useGetAllStock } from '../../queries/StockQuery';
import { useGetAllProduct } from '../../queries/ProductQuery';
import MapperUtil from '../../utils/MapperUtil';
import StockForm from './StockForm';

export type StockPageProps = {};

const StockPage: FC<StockPageProps> = (): any => {
    const { isLoading: isLoadingStocks, isFetching: isFetchingStocks, data: stocks } = useGetAllStock();
    const { isLoading: isLoadingProducts, isFetching: isFetchingProducts, data: products } = useGetAllProduct();
    const { isLoading: isLoadingWards, isFetching: isFetchingWards, data: wards } = useGetAllHospitalWard();

    const rows = stocks;

    const columns: GridColDef[] = [
        {
            field: 'wardId',
            headerName: 'Hospital Ward',
            width: 180,
            valueGetter: (e) => MapperUtil.getEntityNameById(wards!, e.row.wardId),
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 80,
            type: 'number',
        },
        {
            field: 'productId',
            headerName: 'Product Name',
            width: 255,
            valueGetter: (e) => MapperUtil.getEntityNameById(products!, e.row.productId),
        },
    ];

    if (
        isLoadingProducts &&
        isFetchingProducts &&
        isLoadingStocks &&
        isFetchingStocks &&
        isLoadingWards &&
        isFetchingWards
    ) {
        return <LoadingIndicator loading />;
    }

    return <TableAndDetailsLayout rows={rows ?? [{}]} columns={columns} pageUrl="/stock" detailedView={StockForm} />;
};

export default StockPage;
