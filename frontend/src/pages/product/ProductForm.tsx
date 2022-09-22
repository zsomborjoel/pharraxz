import React, { FC, useEffect, useState, useContext } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { Product } from '../../services/model/Product';
import { useDeleteProduct, useSaveProduct } from '../../queries/ProductQuery';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';
import { handleError } from '../../utils/ErrorHandler';
import SaveUtil from '../../utils/SaveUtil';

export type ProductFormProps = {
    selectedElement: Product;
    onSave: (product: Product) => void;
    onDelete: (productId: string) => void;
};

const ProductForm: FC<ProductFormProps> = ({ selectedElement, onSave, onDelete }) => {
    const [product, setProduct] = useState<Product | null>(selectedElement);

    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [isNewProduct, setIsNewProduct] = useState<boolean>(false);

    const { showSnackbar } = useContext(SnackbarContext);

    const { mutate: deleteProductMutate } = useDeleteProduct();
    const { mutate: saveProductMutate } = useSaveProduct();

    const initializeForm = (): void => {
        setProduct(selectedElement);

        setIsNewProduct(false);
        setIsSaveable(false);
    };

    const clearFormForNewProduct = (): void => {
        setIsNewProduct(true);
        setProduct(null);
    };

    const deleteProduct = (): void => {
        deleteProductMutate(selectedElement.name!, {
            onSuccess: () => {
                onDelete(selectedElement.name!);
                showSnackbar({ severity: 'success', text: 'Successfully deleted.' });
            },
            onError: (error) => {
                handleError(error);
            },
        });
    };

    const saveProduct = (): void => {
        saveProductMutate(selectedElement, {
            onSuccess() {
                onSave(selectedElement);
                setIsSaveable(false);
                showSnackbar({ severity: 'success', text: 'Successfully saved.' });
            },
            onError(error) {
                handleError(error);
            },
        });
    };

    /*
    const updateProduct = (property: keyof Product, value: any): void => {
        setProduct({ ...product, [property]: value } as Product);
    };

    <TextField
                        required
                        label="Supplier Code"
                        fullWidth
                        margin="dense"
                        size="small"
                        maxRows={3}
                        multiline
                        value={supplier?.code ?? ''}
                        onChange={(e) => updateSupplier('code', e.target.value)}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={supplier?.archive}
                                onChange={(e) => updateSupplier('archive', e.target.checked)}
                            />
                        }
                        label="Archive"
                    />
    */

    useEffect(() => {
        initializeForm();
    }, [selectedElement]);

    useEffect(() => {
        const isValid = SaveUtil.isSaveEnabled(selectedElement, product, [
            'name',
            'packaging',
            'distributor',
            'releasable',
        ]);
        setIsSaveable(isValid ?? false);
    }, [selectedElement, product]);

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Box>
                <Grid container spacing={1}>
                    <Grid item xs={6} display="flex" sx={{ mt: 6 }}>
                        <Button sx={{ width: 140 }} disabled={!isSaveable} onClick={saveProduct} variant="contained">
                            Save
                        </Button>
                        <Button
                            sx={{ width: 140, ml: 1 }}
                            variant="outlined"
                            disabled={isNewProduct}
                            onClick={clearFormForNewProduct}
                        >
                            Add new
                        </Button>
                    </Grid>
                    <Grid item xs={6} display="flex" sx={{ mt: 6 }} justifyContent="flex-end">
                        <Button sx={{ mr: 6, width: 140 }} variant="contained" color="error" onClick={deleteProduct}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductForm;
