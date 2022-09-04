import React from 'react';
import HomePage from '../pages/home/HomePage';
import OrderPage from '../pages/order/OrderPage';
import ProductProvider from '../contexts/ProductContext';
import { ROUTES } from './constants';
import ProductPage from '../pages/product/ProductPage';
import SupplierProvider from '../contexts/SupplierContext';

export default [
    { path: `${ROUTES.ROOT}`, element: <HomePage />, name: 'Home' },
    { path: `${ROUTES.HOME}`, element: <HomePage />, name: 'Home' },
    {
        path: `${ROUTES.ORDER}`,
        element: (
            <ProductProvider>
                <OrderPage />
            </ProductProvider>
        ),
        name: 'Order',
    },
    {
        path: `${ROUTES.ORDER}:id`,
        element: (
            <ProductProvider>
                <OrderPage />
            </ProductProvider>
        ),
        name: 'Order',
    },
    {
        path: `${ROUTES.PRODUCT}`,
        element: (
            <SupplierProvider>
                <ProductProvider>
                    <ProductPage />
                </ProductProvider>
            </SupplierProvider>
        ),
        name: 'Product',
    },
    {
        path: `${ROUTES.PRODUCT}:id`,
        element: (
            <SupplierProvider>
                <ProductProvider>
                    <ProductPage />
                </ProductProvider>
            </SupplierProvider>
        ),
        name: 'Product',
    },
];
