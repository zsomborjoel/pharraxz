import React, { FC, useEffect, useState, useContext } from 'react';
import { Box, Grid, Button, TextField, Autocomplete } from '@mui/material';
import { useGetAllProduct } from '../../queries/ProductQuery';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';
import { handleError } from '../../utils/ErrorHandler';
import SaveUtil from '../../utils/SaveUtil';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Stock } from '../../services/model/Stock';
import { useDeleteStock, useSaveStock } from '../../queries/StockQuery';
import { useGetAllHospitalWard } from '../../queries/HospitalWardQuery';
import MapperUtil from '../../utils/MapperUtil';

export type StockFormProps = {
    selectedElement: Stock;
    onSave: (stock: Stock) => void;
    onDelete: (stockId: string) => void;
};

const StockForm: FC<StockFormProps> = ({ selectedElement, onSave, onDelete }) => {
    const [stock, setStock] = useState<Stock | null>(selectedElement);

    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [isNewStock, setIsNewStock] = useState<boolean>(false);

    const { showSnackbar } = useContext(SnackbarContext);

    const { data: products } = useGetAllProduct();
    const { data: wards } = useGetAllHospitalWard();

    const { mutate: deleteStockMutate } = useDeleteStock();
    const { mutate: saveStockMutate } = useSaveStock();

    const initializeForm = (): void => {
        setStock(selectedElement);

        setIsNewStock(false);
        setIsSaveable(false);
    };

    const clearFormForNewProduct = (): void => {
        setIsNewStock(true);
        setStock(null);
    };

    const deleteStock = (): void => {
        deleteStockMutate(selectedElement.id!, {
            onSuccess: () => {
                onDelete(`${selectedElement.id!}`);
                showSnackbar({ severity: 'success', text: 'Successfully deleted.' });
            },
            onError: (error) => {
                handleError(error);
            },
        });
    };

    const saveStock = (): void => {
        saveStockMutate(stock!, {
            onSuccess(id) {
                onSave({ ...stock!, id });
                setIsSaveable(false);
                showSnackbar({ severity: 'success', text: 'Successfully saved.' });
            },
            onError(error) {
                handleError(error);
            },
        });
    };

    const updateStock = (property: keyof Stock, value: any): void => {
        setStock({ ...stock, [property]: value } as Stock);
    };

    useEffect(() => {
        initializeForm();
    }, [selectedElement]);

    useEffect(() => {
        const isValid = SaveUtil.isSaveEnabled(selectedElement, stock, ['wardId', 'quantity', 'productId']);
        setIsSaveable(isValid ?? false);
    }, [selectedElement, stock]);

    if (wards === undefined || products === undefined) {
        return <LoadingIndicator loading />;
    }

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Box>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={4} display="flex">
                        <Autocomplete
                            sx={{ pt: 1 }}
                            fullWidth
                            size="small"
                            options={wards!.map((ward) => ward.name)}
                            value={MapperUtil.getEntityNameById(wards!, stock?.wardId)}
                            onChange={(_e, v) => updateStock('wardId', MapperUtil.getEntityIdByName(wards!, v))}
                            renderInput={(params) => <TextField required {...params} label="Ward Name" />}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Quantity"
                            type="number"
                            required
                            fullWidth
                            margin="dense"
                            size="small"
                            value={stock?.quantity ?? ''}
                            onChange={(e) => updateStock('quantity', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <Autocomplete
                            sx={{ pt: 1 }}
                            fullWidth
                            size="small"
                            options={products!.map((product) => product.name)}
                            value={MapperUtil.getEntityNameById(products!, stock?.productId)}
                            onChange={(_e, v) => updateStock('productId', MapperUtil.getEntityIdByName(products!, v))}
                            renderInput={(params) => <TextField required {...params} label="Product Name" />}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={6} display="flex" sx={{ mt: 6 }}>
                        <Button sx={{ width: 140 }} disabled={!isSaveable} onClick={saveStock} variant="contained">
                            Save
                        </Button>
                        <Button
                            sx={{ width: 140, ml: 1 }}
                            variant="outlined"
                            disabled={isNewStock}
                            onClick={clearFormForNewProduct}
                        >
                            Add new
                        </Button>
                    </Grid>
                    <Grid item xs={6} display="flex" sx={{ mt: 6 }} justifyContent="flex-end">
                        <Button sx={{ mr: 6, width: 140 }} variant="contained" color="error" onClick={deleteStock}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default StockForm;
