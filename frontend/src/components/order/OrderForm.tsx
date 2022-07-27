import React, { FC, useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, Collapse, Typography } from '@mui/material';
import { OrderDetail } from '../../services/model/OrderDetail';
import { Product } from '../../services/model/Product';
import OrderService from '../../services/OrderService';
import AuthService from '../../services/AuthService';
import { OrderSaveRequest } from '../../services/model/OrderSaveRequest';
import { OrderView } from '../../services/model/OrderView';

export type OrderFormProps = {
    orderView: OrderView;
    updateOrderDetail: () => void;
    orderDetailIdProp: number;
};

const OrderForm: FC<OrderFormProps> = ({ orderView, updateOrderDetail, orderDetailIdProp }) => {
    const [orderId, setOrderId] = useState<number | null>(orderView?.orderId || null);
    const [orderDetailId, setOrderDetailId] = useState<number | null>(orderDetailIdProp);
    const [description, setDescription] = useState<string | null>(orderView?.description || '');
    const [productName, setProductName] = useState<string | null>(orderView?.product.name || '');
    const [oderType, setOrderType] = useState<string | null>(orderView?.oderType || '');
    const [quantity, setQuantity] = useState<number | null>(orderView?.quantity || null);
    const [startDate, setStartDate] = useState<string | null>(orderView?.startDate || '');
    const [endDate, setEndDate] = useState<string | null>(orderView?.endDate || '');
    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const initializeForm = (): void => {
        setOrderId(orderView?.orderId || null);
        setDescription(orderView?.description || '');
        setOrderDetailId(orderView?.orderDetailId || null);
        setProductName(orderView?.product.name || '');
        setOrderType(orderView?.oderType || '');
        setQuantity(orderView?.quantity || 0);
        setStartDate(orderView?.startDate || '');
        setEndDate(orderView?.endDate || '');
        setIsSaveable(false);
    };

    const resetForm = (): void => {
        setOrderId(0);
        setDescription('');
        setOrderDetailId(null);
        setProductName('');
        setOrderType('');
        setQuantity(0);
        setStartDate('');
        setEndDate('');
    };

    const deleteOrderDetail = (): void => {
        if (orderDetailId) {
            OrderService.deleteOrderDetail(orderDetailId).then(() => updateOrderDetail());
        }
    };

    useEffect(() => {
        initializeForm();
    }, [orderView]);

    useEffect(() => {
        const changed =
            productName !== (orderView?.product.name || null) ||
            quantity !== (orderView?.quantity || null) ||
            startDate !== (orderView?.startDate || null) ||
            endDate !== (orderView?.endDate || null);

        const mandatoryExists = productName !== null && quantity !== null && startDate !== null && endDate !== null;

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

    const saveOrder = (): void => {
        OrderService.saveOrder(getOrderSaveRequest())
            .then((response) => updateOrderDetail())
            .catch((error) => {
                switch (error.response.status) {
                case 400: {
                    setErrorMessage('Order already exists!');
                    setIsSaveable(false);
                    break;
                }
                default: {
                    setErrorMessage('Unexpected error!');
                    setIsSaveable(false);
                }
                }
            });
    };

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={4} display="flex">
                    <TextField
                        type="number"
                        label="Order Id"
                        fullWidth
                        margin="dense"
                        size="small"
                        required
                        value={orderId}
                        onChange={(e) => setOrderId(parseInt(e.target.value, 10))}
                    />
                </Grid>
                <Grid item xs={8} display="flex">
                    <TextField
                        label="Order Description"
                        fullWidth
                        margin="dense"
                        size="small"
                        maxRows={3}
                        multiline
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={4} display="flex">
                    <TextField
                        label="Product Name"
                        fullWidth
                        margin="dense"
                        size="small"
                        maxRows={3}
                        multiline
                        required
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={5} display="flex">
                    <TextField
                        label="Order Type"
                        fullWidth
                        margin="dense"
                        size="small"
                        maxRows={3}
                        multiline
                        value={setOrderType}
                        onChange={(e) => setOrderType(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3} display="flex">
                    <TextField
                        type="number"
                        label="Quantity"
                        fullWidth
                        margin="dense"
                        size="small"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={3} display="flex">
                    <TextField
                        label="Start Date"
                        fullWidth
                        margin="dense"
                        size="small"
                        maxRows={3}
                        multiline
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3} display="flex">
                    <TextField
                        label="End Date"
                        fullWidth
                        margin="dense"
                        size="small"
                        maxRows={3}
                        multiline
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6} display="flex" sx={{ mt: 6 }}>
                    <Box>
                        <Button sx={{ width: 140 }} variant="contained" disabled={!isSaveable} onClick={saveOrder}>
                            Save
                        </Button>
                        <Collapse collapsedSize={0} in={!!errorMessage} sx={{ position: 'fixed' }}>
                            <Typography color="error">{errorMessage}</Typography>
                        </Collapse>
                    </Box>
                    <Button sx={{ width: 140, ml: 1 }} variant="outlined" disabled={!orderId} onClick={resetForm}>
                        Add new
                    </Button>
                </Grid>
                <Grid item xs={6} display="flex" sx={{ mt: 6 }} justifyContent="flex-end">
                    <Button sx={{ mr: 6, width: 140 }} variant="contained" color="error" onClick={deleteOrderDetail}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderForm;