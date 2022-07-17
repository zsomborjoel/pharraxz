import React, { FC, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Collapse,
    FormControlLabel,
    Grid,
    InputAdornment,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { OrderDetail } from '../../services/model/OrderDetail';
import { Product } from '../../services/model/Product';
import OrderService from '../../services/OrderService';
import AuthService from '../../services/AuthService';
import { OrderSaveRequest } from '../../services/model/OrderSaveRequest';
import { OrderOverview } from '../../services/model/OrderOverview';

export type OrderDetailFormProps = {
    orderOverview: OrderOverview,
    updateOrderDetail: (orderDetail: OrderDetail) => void,
    onDeleteOrderDetail: () => void,
    orderId: number
}

const OrderDetailForm: FC<OrderDetailFormProps> = (
    {
        orderOverview,
        updateOrderDetail,
        onDeleteOrderDetail,
        orderId,
    },
) => {
    const [id, _setId] = useState<number | null>(orderId);
    const [orderDetailId, setOrderDetailId] = useState<number>(orderOverview?.orderDetail?.orderDetailId);
    const [orderDetailDescription, setOrderDetailDescription] = useState<string | null>(null);
    const [productName, setProductName] = useState<string | null>(orderOverview?.orderDetail?.product.name || null);
    const [oderType, setOrderType] = useState<string | null>(orderOverview?.orderDetail?.oderType || null);
    const [quantity, setQuantity] = useState<number | null>(orderOverview?.orderDetail?.quantity || null);
    const [startDate, setStartDate] = useState<string | null>(orderOverview?.orderDetail?.startDate || null);
    const [endDate, setEndDate] = useState<string | null>(orderOverview?.orderDetail?.endDate || null);
    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const initializeForm = (): void => {
        _setId(orderOverview?.orderDetail?.orderDetailId || null);
        setProductName(orderOverview?.orderDetail?.product.name || null);
        setOrderType(orderOverview?.orderDetail?.oderType || null);
        setQuantity(orderOverview?.orderDetail?.quantity || null);
        setStartDate(orderOverview?.orderDetail?.startDate || null);
        setEndDate(orderOverview?.orderDetail?.endDate || null);
        setIsSaveable(false);
    };

    const resetForm = (): void => {
        _setId(null);
        setProductName(null);
        setOrderType(null);
        setQuantity(null);
        setStartDate(null);
        setEndDate(null);
    };

    const deleteOrderDetail = (): void => {
        OrderService.deleteOrderDetail(orderDetailId).then(() => onDeleteOrderDetail());
    };

    useEffect(() => {
        initializeForm();
        _setId(orderOverview?.orderDetail?.orderDetailId);
    }, [orderDetailId]);

    useEffect(() => {
        const changed = productName !== (orderOverview?.orderDetail?.product.name || null)
            || quantity !== (orderOverview?.orderDetail?.quantity || null)
            || startDate !== (orderOverview?.orderDetail?.startDate || null)
            || endDate !== (orderOverview?.orderDetail?.endDate || null);

        const mandatoryExists = productName !== null
            && quantity !== null
            && startDate !== null
            && endDate !== null;

        setIsSaveable(changed && mandatoryExists);
        setErrorMessage(null);
    }, [productName, quantity, startDate, endDate]);

    const getProduct = (): Product => {
        return {
            name: productName,
        };
    };

    const getOrderDetail = (): OrderDetail => {
        return {
            orderDetailId,
            product: getProduct(),
            quantity,
            oderType,
            startDate,
            endDate,
        };
    };

    const getOrderSaveRequest = (): OrderSaveRequest => {
        return {
            orderId,
            userId: AuthService.getCurrentUser()?.userId,
            description,
            orderDetail: getOrderDetail(),
        };
    }

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={4} display="flex">
                    <TextField label="Product Name" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={productName} onChange={(e) => setProductName(e.target.value)}
                </Grid>
                <Grid item xs={5} display="flex">
                    <TextField label="Order Type" fullWidth margin="dense" size="small" maxRows={3} multiline
                        value={setOrderType} onChange={(e) => setOrderType(e.target.value)}/>
                </Grid>
                <Grid item xs={3} display="flex">
                    <TextField label="Quantity" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={3} display="flex">
                    <TextField label="Start Date" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                </Grid>
                <Grid item xs={3} display="flex">
                    <TextField label="End Date" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderDetailForm;
