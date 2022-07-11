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

export type DoctorOrderDetailFormProps = {
    doctorOrderDetail: OrderDetail,
    updateDoctorOrderDetail: (doctorOrderDetail: OrderDetail) => void,
    onDeleteDoctorOrderDetail: () => void,
    doctorOrderDetailId: number
}

const DoctorOrderDetailForm: FC<DoctorOrderDetailFormProps> = (
    {
        doctorOrderDetail,
        updateDoctorOrderDetail,
        onDeleteDoctorOrderDetail,
        doctorOrderDetailId,
    },
) => {
    const [id, _setId] = useState<number | null>(doctorOrderDetailId);
    const [orderDetailId, setOrderDetailId] = useState<number | null>(doctorOrderDetail.orderDetailId || null);
    const [productId, setProductId] = useState<number | null>(doctorOrderDetail?.product.productId || null);
    const [productName, setProductName] = useState<string | null>(doctorOrderDetail?.product.name || null);
    const [quantity, setQuantity] = useState<number | null>(doctorOrderDetail.quantity || null);
    const [startDate, setStartDate] = useState<string | null>(doctorOrderDetail.startDate || null);
    const [endDate, setEndDate] = useState<string | null>(doctorOrderDetail.endDate || null);
    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const initializeForm = (): void => {
        setOrderDetailId(doctorOrderDetail.orderDetailId || null);
        setProductId(doctorOrderDetail?.product.productId || null);
        setProductName(doctorOrderDetail?.product.name || null);
        setQuantity(doctorOrderDetail.quantity || null);
        setStartDate(doctorOrderDetail.startDate || null);
        setEndDate(doctorOrderDetail.endDate || null);
        setIsSaveable(false);
    };

    const resetForm = (): void => {
        _setId(null);
        setOrderDetailId(null);
        setProductId(null);
        setProductName(null);
        setQuantity(null);
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div />
    );
};

export default DoctorOrderDetailForm;
