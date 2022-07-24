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

export type OrderDetailFormProps = {
    orderDetail: OrderDetail,
    updateOrderDetail: (orderDetail: OrderDetail) => void,
    onDeleteOrderDetail: () => void,
    orderId: number
}

const OrderDetailForm: FC<OrderDetailFormProps> = (
    {
        orderDetail,
        updateOrderDetail,
        onDeleteOrderDetail,
        orderId,
    },
) => {
    const [id, setId] = useState<number | null>(orderId);
    const [description, setDescription] = useState<string | null>(null);
    const [orderDetailId, setOrderDetailId] = useState<number>(orderDetail?.orderDetailId);
    const [orderDetailDescription, setOrderDetailDescription] = useState<string | null>(null);
    const [productName, setProductName] = useState<string | null>(orderDetail?.product.name || null);
    const [oderType, setOrderType] = useState<string | null>(orderDetail?.oderType || null);
    const [quantity, setQuantity] = useState<number | null>(orderDetail?.quantity || null);
    const [startDate, setStartDate] = useState<string | null>(orderDetail?.startDate || null);
    const [endDate, setEndDate] = useState<string | null>(orderDetail?.endDate || null);
    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const initializeForm = (): void => {
        setId(orderDetail?.orderDetailId || null);
        setProductName(orderDetail?.product.name || null);
        setOrderType(orderDetail?.oderType || null);
        setQuantity(orderDetail?.quantity || null);
        setStartDate(orderDetail?.startDate || null);
        setEndDate(orderDetail?.endDate || null);
        setIsSaveable(false);
    };

    const resetForm = (): void => {
        setId(null);
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
        setId(orderDetail?.orderDetailId);
    }, [orderDetailId]);

    useEffect(() => {
        const changed = productName !== (orderDetail?.product.name || null)
            || quantity !== (orderDetail?.quantity || null)
            || startDate !== (orderDetail?.startDate || null)
            || endDate !== (orderDetail?.endDate || null);

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
            atc: null,
            registerNumber: null,
            packaging: null,
            description: null,
            inn: null,
            releasable: null,
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
    };

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={3} display="flex">
                    <TextField label="Order Id" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={id} onChange={(e) => setId(parseInt(e.target.value, 10))}/>
                </Grid>
                <Grid item xs={3} display="flex">
                    <TextField label="Order Description" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={4} display="flex">
                    <TextField label="Product Name" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={productName} onChange={(e) => setProductName(e.target.value)}/>
                </Grid>
                <Grid item xs={5} display="flex">
                    <TextField label="Order Type" fullWidth margin="dense" size="small" maxRows={3} multiline
                        value={setOrderType} onChange={(e) => setOrderType(e.target.value)}/>
                </Grid>
                <Grid item xs={3} display="flex">
                    <TextField label="Quantity" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}/>
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
