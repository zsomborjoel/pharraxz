import React from 'react';
import HomePage from '../pages/home/HomePage';
import OrderPage from '../pages/order/OrderPage';
import ProductProvider from '../contexts/ProductContext';
import { ROUTES } from './constants';

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
    { path: `${ROUTES.PRODUCT}`, element: <OrderPage />, name: 'Product' },
    { path: `${ROUTES.PRODUCT}:id`, element: <OrderPage />, name: 'Product' },
];
