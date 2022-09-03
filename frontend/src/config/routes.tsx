import React from 'react';
import HomePage from '../pages/home/HomePage';
import OrderPage from '../pages/order/OrderPage';
import { ROUTES } from './constants';

export default [
    { path: `${ROUTES.ROOT}`, element: <HomePage />, name: 'Home' },
    { path: `${ROUTES.HOME}`, element: <HomePage />, name: 'Home' },
    { path: `${ROUTES.ORDER}`, element: <OrderPage />, name: 'Order' },
    { path: `${ROUTES.ORDER}:id`, element: <OrderPage />, name: 'Order' },
    { path: `${ROUTES.PRODUCT}`, element: <OrderPage />, name: 'Product' },
    { path: `${ROUTES.PRODUCT}:id`, element: <OrderPage />, name: 'Product' },
];
