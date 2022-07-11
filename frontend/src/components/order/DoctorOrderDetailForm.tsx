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

    const deleteOrderDetail = (): void => {
        Ord.deletePartNumber(partNumberId).then(() => onDeletePartNumber());
    };

    useEffect(() => {
        initializeForm();
        _setId(doctorOrderDetail.orderDetailId);
    }, [doctorOrderDetail]);

    useEffect(() => {
        const changed = code !== (partNumber.code || null)
            || originalManufacturerCode !== (partNumber.originalManufacturerCode || null)
            || productId !== (partNumber.productId || null)
            || partTypeId !== (partNumber.partTypeId || null)
            || supplierId !== (partNumber.supplierId || null)
            || decisionType !== (partNumber.decisionType || null)
            || materialDescription !== (partNumber.materialDescription || '')
            || materialClassAirlineId !== (partNumber.materialClassAirlineId || null)
            || repairableAirline !== (partNumber.repairableAirline || false)
            || materialClassLHTId !== (partNumber.materialClassLHTId || null)
            || manhoursPN !== (partNumber.manhoursPN || null)
            || photoEvidence !== (partNumber.photoEvidence || false)
            || superseded !== (partNumber.superseded || false)
            || archive !== (partNumber.archive || false);

        const mandatoryExists = code !== null
            && originalManufacturerCode !== null
            && productId !== null
            && partTypeId !== null
            && supplierId !== null
            && decisionType !== null;

        setIsSaveable(changed && mandatoryExists);
        setErrorMessage(null);
    }, [code, originalManufacturerCode, productId, partTypeId, supplierId, decisionType, materialDescription,
        materialClassAirlineId, repairableAirline, materialClassLHTId, manhoursPN, photoEvidence, superseded, archive]);

    const getSaveRequest = (): PartNumber => {
        return {
            id,
            code,
            originalManufacturerCode,
            partTypeId,
            partTypeName: null,
            productId,
            supplierId,
            decisionType,
            materialDescription,
            materialClassAirlineId,
            repairableAirline,
            materialClassLHTId,
            manhoursPN,
            photoEvidence,
            superseded,
            archive,
        };
    };


    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={4} display="flex">
                    <TextField label="Part Number" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={code} onChange={(e) => setCode(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="AMOS Link">
                                        <Box onClick={openAmosLink} sx={{ cursor: 'pointer', paddingTop: 0.5 }}>
                                            <img alt="AMOS Link" src={logo} height="20"/>
                                        </Box>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}/>
                </Grid>
                <Grid item xs={5} display="flex">
                    <TextField label="Description" fullWidth margin="dense" size="small" maxRows={3} multiline
                        value={materialDescription} onChange={(e) => setMaterialDescription(e.target.value)}/>
                </Grid>
                <Grid item xs={3} display="flex">
                    <TextField label="Manufacturer" fullWidth margin="dense" size="small" maxRows={3} multiline required
                        value={originalManufacturerCode} onChange={(e) => setOriginalManufacturerCode(e.target.value)}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={4} display="flex">
                    <AutocompleteSearchInputWithId fullWidth required label="Part type" value={partTypeId || null}
                        setValue={setPartTypeId}
                        options={partTypes} disabled={!productId}/>
                </Grid>
                <Grid item xs={5} display="flex">
                    <SimpleDropdown label="Product" value={productId} setValue={setProductId} displayNone required
                        options={productIds}/>
                </Grid>
                <Grid item xs={3} display="flex">
                    <SimpleDropdown label="Creditor" value={supplierId} setValue={setSupplierId} displayNone required
                        options={supplierIds}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={3} display="flex">
                    <DecisionTypeDropdown label="Decision Type" value={decisionType} setValue={setDecisionType} required/>
                </Grid>
                <Grid item container xs={3} display="flex" direction="column">
                    <Grid item>
                        <AutocompleteSearchInput fullWidth label="Material Class" value={materialClassAirlineId || ''}
                            setValue={setMaterialClassAirlineId} options={materialClasses}/>
                    </Grid>
                    <Grid item>
                        <FormControlLabel control={
                            <Switch checked={repairableAirline} onChange={(e) => setRepairableAirline(e.target.checked)}/>
                        } label="Repairable"/>
                    </Grid>
                </Grid>
                <Grid item xs={3} display="flex">
                    <AutocompleteSearchInput fullWidth label="Material Class LHT" value={materialClassLHTId || ''}
                        setValue={setMaterialClassLHTId} options={materialClasses}/>
                </Grid>
                <Grid item xs={3} display="flex">
                    <TextField label="MH" fullWidth margin="dense" size="small" maxRows={3} multiline type="number"
                        value={manhoursPN || ''} onChange={(e) => setManhoursPN(e.target.value as unknown as number)}/>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    <FormControlLabel control={
                        <Switch checked={photoEvidence} onChange={(e) => setPhotoEvidence(e.target.checked)}/>
                    } label="Photo Evidence"/>
                    <br/>
                    <FormControlLabel control={
                        <Switch checked={superseded} onChange={(e) => setSuperseded(e.target.checked)}/>
                    } label="Superseded"/>
                    <br/>
                    <FormControlLabel control={
                        <Switch checked={archive} onChange={(e) => setArchive(e.target.checked)}/>
                    } label="Archive"/>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6} display="flex" sx={{ mt: 6 }}>
                    <Box>
                        <Button sx={{ width: 140 }} variant="contained"
                            disabled={!isSaveable} onClick={savePartNumber}>
                            Save
                        </Button>
                        <Collapse collapsedSize={0} in={!!errorMessage} sx={{ position: 'fixed' }}>
                            <Typography color="error">{errorMessage}</Typography>
                        </Collapse>
                    </Box>
                    <Button sx={{ width: 140, ml: 1 }} variant="outlined"
                        disabled={!id} onClick={resetForm}>
                        Add new
                    </Button>
                </Grid>
                <Grid item xs={6} display="flex" sx={{ mt: 6 }} justifyContent="flex-end">
                    <Button sx={{ mr: 6, width: 140 }} variant="contained" color="error"
                        onClick={deletePartNumber}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DoctorOrderDetailForm;
