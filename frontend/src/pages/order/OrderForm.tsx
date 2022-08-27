import React, { FC, useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, Collapse, Typography, Autocomplete } from '@mui/material';
import { OrderDetail } from '../../services/model/OrderDetail';
import { Product } from '../../services/model/Product';
import OrderService from '../../services/OrderService';
import AuthService from '../../services/AuthService';
import { OrderSaveRequest } from '../../services/model/OrderSaveRequest';
import { OrderView } from '../../services/model/OrderView';
import ProductService from '../../services/ProductService';
import OrderTypeDropdown from '../../components/order/OrderTypeDropdown';

export type OrderFormProps = {
    selectedElement: OrderView;
    onSave: (element: any) => void;
    onDelete: (element: any) => void;
};

const OrderForm: FC<OrderFormProps> = ({ selectedElement, onSave, onDelete }) => {
    const [products, setProducts] = useState<(string | null)[]>([]);
    const [orderId, setOrderId] = useState<number | null>(selectedElement?.orderId);
    const [orderDetailId, setOrderDetailId] = useState<number | null>(selectedElement?.id);
    const [description, setDescription] = useState<string | null>(selectedElement?.description || '');
    const [productName, setProductName] = useState<string | null>(selectedElement?.product.name || '');
    const [orderType, setOrderType] = useState<string | null>(selectedElement?.orderType || '');
    const [quantity, setQuantity] = useState<number | null>(selectedElement?.quantity || null);
    const [startDate, setStartDate] = useState<string | null>(selectedElement?.startDate || '');
    const [endDate, setEndDate] = useState<string | null>(selectedElement?.endDate || '');
    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const initializeForm = (): void => {
        setOrderId(selectedElement?.orderId || null);
        setDescription(selectedElement?.description || '');
        setOrderDetailId(selectedElement?.id || null);
        setProductName(selectedElement?.product.name || '');
        setOrderType(selectedElement?.orderType || '');
        setQuantity(selectedElement?.quantity || 0);
        setStartDate(selectedElement?.startDate || '');
        setEndDate(selectedElement?.endDate || '');
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

    const getProduct = (): Product => ({
        name: productName,
        atc: null,
        registerNumber: null,
        packaging: null,
        description: null,
        inn: null,
        releasable: null,
    });

    const getOrderDetail = (): OrderDetail => ({
        orderDetailId,
        product: getProduct(),
        quantity,
        orderType,
        startDate,
        endDate,
    } as OrderDetail);

    const getOrderSaveRequest = (): OrderSaveRequest => ({
        orderId,
        userId: AuthService.getCurrentUser()?.userId,
        description,
        orderDetail: getOrderDetail(),
    });

    const deleteOrderDetail = (): void => {
        if (orderDetailId) {
            OrderService.deleteOrderDetail(orderDetailId).finally(() => onDelete(selectedElement));
        }
    };

    const saveOrder = (): void => {
        OrderService.saveOrder(getOrderSaveRequest())
            .then((result) => {
                onSave(result.data);
            })
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

    useEffect(() => {
        ProductService.getAllProducts().then((result) => {
            setProducts(result.data.map((p) => p.name));
        });
    }, []);

    useEffect(() => {
        initializeForm();
    }, [selectedElement]);

    useEffect(() => {
        const changed =
            orderId !== (selectedElement?.orderId || null)
            || description !== (selectedElement?.description || '')
            || productName !== (selectedElement?.product.name || '')
            || orderType !== (selectedElement?.orderType || '')
            || quantity !== (selectedElement?.quantity || null)
            || startDate !== (selectedElement?.startDate || '')
            || endDate !== (selectedElement?.endDate || '');

        const mandatoryExists =
            (productName !== null && productName !== '')
            && (orderType !== null && orderType !== '')
            && (quantity !== 0)
            && (startDate !== null && startDate !== '')
            && (endDate !== null && endDate !== '');

        setIsSaveable(changed && mandatoryExists);
        setErrorMessage(null);
    }, [orderId, description, productName, orderType, quantity, startDate, endDate]);

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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={4} display="flex">
                    <Autocomplete
                        sx={{ pt: 1 }}
                        fullWidth
                        size="small"
                        options={products}
                        value={productName}
                        onChange={(_e, v) => setProductName(v)}
                        renderInput={(params) => <TextField {...params} label="Product Name" />}
                    />
                </Grid>
                <Grid item xs={5} display="flex">
                    <OrderTypeDropdown
                        label="Order Type"
                        value={orderType}
                        setValue={setOrderType}
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