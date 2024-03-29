import React from 'react';
import HomePage from '../pages/home/HomePage';
import OrderPage from '../pages/order/OrderPage';
import { ROUTES } from './constants';
import ProductPage from '../pages/product/ProductPage';
import SupplierPage from '../pages/supplier/SupplierPage';
import StockPage from '../pages/stock/StockPage';
import UserPage from '../pages/user/UserPage';
import { RoleName } from '../services/enum/RoleName';
import FilePage from '../pages/file/FilePage';

export default [
    { path: `${ROUTES.ROOT}`, element: <HomePage />, name: 'Home' },
    { path: `${ROUTES.HOME}`, element: <HomePage />, name: 'Home' },
    {
        path: `${ROUTES.ORDER}`,
        element: <OrderPage />,
        name: 'Order',
    },
    {
        path: `${ROUTES.ORDER}/:id`,
        element: <OrderPage />,
        name: 'Order',
    },
    {
        path: `${ROUTES.PRODUCT}`,
        element: <ProductPage />,
        name: 'Product',
    },
    {
        path: `${ROUTES.PRODUCT}/:id`,
        element: <ProductPage />,
        name: 'Product',
    },
    {
        path: `${ROUTES.SUPPLIER}`,
        element: <SupplierPage />,
        name: 'Supplier',
    },
    {
        path: `${ROUTES.SUPPLIER}/:id`,
        element: <SupplierPage />,
        name: 'Supplier',
    },
    {
        path: `${ROUTES.STOCK}`,
        element: <StockPage />,
        name: 'Stock',
    },
    {
        path: `${ROUTES.STOCK}/:id`,
        element: <StockPage />,
        name: 'Stock',
    },
    {
        path: `${ROUTES.USER}`,
        element: <UserPage />,
        name: 'User',
        requiredUserRoles: [RoleName.ROLE_ADMIN],
    },
    {
        path: `${ROUTES.USER}/:id`,
        element: <UserPage />,
        name: 'User',
        requiredUserRoles: [RoleName.ROLE_ADMIN],
    },
    {
        path: `${ROUTES.FILE}`,
        element: <FilePage />,
        name: 'File',
    },
];
