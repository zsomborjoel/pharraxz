import React, { FC, useEffect, useState, useContext } from 'react';
import { Box, Grid, TextField, Button, Autocomplete } from '@mui/material';
import { OrderDetail } from '../../services/model/OrderDetail';
import { Product } from '../../services/model/Product';
import AuthService from '../../services/AuthService';
import { OrderSaveRequest } from '../../services/model/OrderSaveRequest';
import { OrderView } from '../../services/model/OrderView';
import OrderTypeDropdown from '../../components/OrderTypeDropdown';
import DatePicker from '../../components/DatePicker';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useDeleteOrder, useSaveOrder } from '../../queries/OrderQuery';
import { useGetAllProduct } from '../../queries/ProductQuery';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';
import { handleError } from '../../utils/ErrorHandler';
import MapperUtil from '../../utils/MapperUtil';
import { OrderType } from '../../services/enum/OrderType';

export type OrderFormProps = {
    selectedElement: OrderView;
    onSave: (element: any) => void;
    onDelete: (element: any) => void;
};

const OrderForm: FC<OrderFormProps> = ({ selectedElement, onSave, onDelete }) => {
    const [orderId, setOrderId] = useState<number | null>(selectedElement?.orderId);
    const [orderDetailId, setOrderDetailId] = useState<number | null>(selectedElement?.id);
    const [description, setDescription] = useState<string | null>(selectedElement?.description || '');
    const [productId, setProductId] = useState<number | null>(selectedElement?.product?.id);
    const [orderType, setOrderType] = useState<OrderType | null>(selectedElement?.orderType || '');
    const [quantity, setQuantity] = useState<number | null>(selectedElement?.quantity || null);
    const [startDate, setStartDate] = useState<Date | null>(selectedElement?.startDate || null);
    const [endDate, setEndDate] = useState<Date | null>(selectedElement?.endDate || null);
    const [isSaveable, setIsSaveable] = useState<boolean>(false);

    const { showSnackbar } = useContext(SnackbarContext);

    const { data: products } = useGetAllProduct();
    const { mutate: deleteOrderMutate } = useDeleteOrder();
    const { mutate: saveOrderMutate } = useSaveOrder();

    const initializeForm = (): void => {
        setOrderId(selectedElement?.orderId || null);
        setDescription(selectedElement?.description || '');
        setOrderDetailId(selectedElement?.id || null);
        setProductId(selectedElement?.product?.id || 0);
        setOrderType(selectedElement?.orderType || '');
        setQuantity(selectedElement?.quantity || 0);
        setStartDate(selectedElement?.startDate || null);
        setEndDate(selectedElement?.endDate || null);
        setIsSaveable(false);
    };

    const resetForm = (): void => {
        setOrderId(0);
        setDescription('');
        setOrderDetailId(null);
        setProductId(0);
        setOrderType(null);
        setQuantity(0);
        setStartDate(null);
        setEndDate(null);
    };

    const getProduct = (): Product | null | undefined => products!.find((product) => product?.id === productId);

    const getOrderDetail = (): OrderDetail =>
        ({
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
            deleteOrderMutate(orderDetailId, {
                onSuccess: () => {
                    onDelete(selectedElement.id);
                    showSnackbar({ severity: 'success', text: 'Successfully deleted.' });
                },
                onError: (error) => {
                    handleError(error);
                },
            });
        }
    };

    const saveOrder = (): void =>
        saveOrderMutate(getOrderSaveRequest(), {
            onSuccess(data) {
                onSave(data);
                setIsSaveable(false);
                showSnackbar({ severity: 'success', text: 'Successfully saved.' });
            },
            onError(error) {
                handleError(error);
            },
        });

    useEffect(() => {
        initializeForm();
    }, [selectedElement]);

    useEffect(() => {
        const changed =
            orderId !== (selectedElement?.orderId || null) ||
            description !== (selectedElement?.description || '') ||
            productId !== (selectedElement?.product?.id || null) ||
            orderType !== (selectedElement?.orderType || '') ||
            quantity !== (selectedElement?.quantity || null) ||
            startDate !== (selectedElement?.startDate || null) ||
            endDate !== (selectedElement?.endDate || null);

        const mandatoryExists =
            productId !== null && orderType !== null && quantity !== 0 && startDate !== null && endDate !== null;

        setIsSaveable(changed && mandatoryExists);
    }, [orderId, description, productId, orderType, quantity, startDate, endDate]);

    if (products === undefined) {
        return <LoadingIndicator loading />;
    }

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
                        options={products!.map((product) => product.name)}
                        value={MapperUtil.getEntityNameById(products, productId) ?? ''}
                        onChange={(_e, v) => setProductId(MapperUtil.getEntityIdByName(products, v)!)}
                        renderInput={(params) => <TextField {...params} label="Product Name" />}
                    />
                </Grid>
                <Grid item xs={5} display="flex">
                    <OrderTypeDropdown label="Order Type" value={orderType as OrderType} onSelect={setOrderType} />
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
                    <DatePicker required label="Start Date" value={startDate} onChange={setStartDate} />
                </Grid>
                <Grid item xs={3} display="flex">
                    <DatePicker required label="End Date" value={endDate} onChange={setEndDate} />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6} display="flex" sx={{ mt: 6 }}>
                    <Button sx={{ width: 140 }} disabled={!isSaveable} onClick={saveOrder} variant="contained">
                        Save
                    </Button>
                    <Button sx={{ width: 140, ml: 1 }} variant="outlined" disabled={!orderId} onClick={resetForm}>
                        Add new
                    </Button>
                </Grid>
                <Grid item xs={6} display="flex" sx={{ mt: 6 }} justifyContent="flex-end">
                    <Button
                        sx={{ mr: 6, width: 140 }}
                        disabled={!orderId}
                        variant="contained"
                        color="error"
                        onClick={deleteOrderDetail}
                    >
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderForm;
