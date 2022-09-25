import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef } from '@mui/x-data-grid';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useGetAllSupplier } from '../../queries/SupplierQuery';
import SupplierForm from './SupplierForm';

export type SupplerPageProps = {};

const SupplierPage: FC<SupplerPageProps> = (): any => {
    const { data: suppliers } = useGetAllSupplier();

    const rows = suppliers;

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 255,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 130,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 130,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 130,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 255,
        },
    ];

    if (suppliers === undefined) {
        return <LoadingIndicator loading />;
    }

    return <TableAndDetailsLayout rows={rows!} columns={columns} pageUrl="/supplier" detailedView={SupplierForm} />;
};

export default SupplierPage;
