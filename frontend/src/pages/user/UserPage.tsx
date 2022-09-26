import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { GridColDef } from '@mui/x-data-grid';
import TableAndDetailsLayout from '../../components/TableAndDetailsLayout';
import LoadingIndicator from '../../components/LoadingIndicator';
import MapperUtil from '../../utils/MapperUtil';
import { useGetAllUser } from '../../queries/UserQuery';
import { useGetAllUserPosition } from '../../queries/UserPositionQuery';
import UserForm from './UserForm';
import { useGetAllRole } from '../../queries/RoleQuery';

export type UserPageProps = {};

const UserPage: FC<UserPageProps> = (): any => {
    const { data: users } = useGetAllUser();
    const { data: userPositions } = useGetAllUserPosition();
    const { data: roles } = useGetAllRole();

    const rows = users;

    const columns: GridColDef[] = [
        {
            field: 'firstname',
            headerName: 'First Name',
            width: 255,
        },
        {
            field: 'lastname',
            headerName: 'Last Name',
            width: 130,
        },
        {
            field: 'username',
            headerName: 'User Name',
            width: 130,
        },
        {
            field: 'userPositionId',
            headerName: 'Position',
            width: 130,
            valueGetter: (e) => MapperUtil.getEntityNameById(userPositions!, e.row.userPositionId),
        },
        {
            field: 'roleId',
            headerName: 'Role',
            width: 130,
            valueGetter: (e) => MapperUtil.getEntityNameById(roles!, e.row.roleId),
        },
    ];

    if (users === undefined || userPositions === undefined || roles === undefined) {
        return <LoadingIndicator loading />;
    }

    return <TableAndDetailsLayout rows={rows!} columns={columns} pageUrl="/user" detailedView={UserForm} />;
};

export default UserPage;
