import React, { FC, useEffect, useState, useContext } from 'react';
import { Box, Grid, Button, TextField, FormControlLabel, Switch, Autocomplete } from '@mui/material';
import { Product } from '../../services/model/Product';
import { useDeleteProduct, useSaveProduct } from '../../queries/ProductQuery';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';
import { handleError } from '../../utils/ErrorHandler';
import SaveUtil from '../../utils/SaveUtil';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useGetAllSupplier } from '../../queries/SupplierQuery';
import { useGetAllReleaseAbleCode } from '../../queries/ReleaseAbleCodeQuery';
import MapperUtil from '../../utils/MapperUtil';

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

    const { isLoading: isLoadingSupplier, isFetching: isFetchingSupplier, data: suppliers } = useGetAllSupplier();
    const {
        isLoading: isLoadingReleaseAbleCode,
        isFetching: isFetchingReleaseAbleCode,
        data: releaseAbleCodes,
    } = useGetAllReleaseAbleCode();

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
        deleteProductMutate(selectedElement.id!, {
            onSuccess: () => {
                onDelete(`${selectedElement.id!}`);
                showSnackbar({ severity: 'success', text: 'Successfully deleted.' });
            },
            onError: (error) => {
                handleError(error);
            },
        });
    };

    const saveProduct = (): void => {
        saveProductMutate(product!, {
            onSuccess(id) {
                onSave({ ...product!, id });
                setIsSaveable(false);
                showSnackbar({ severity: 'success', text: 'Successfully saved.' });
            },
            onError(error) {
                handleError(error);
            },
        });
    };

    const updateProduct = (property: keyof Product, value: any): void => {
        setProduct({ ...product, [property]: value } as Product);
    };

    useEffect(() => {
        initializeForm();
    }, [selectedElement]);

    useEffect(() => {
        const isValid = SaveUtil.isSaveEnabled(selectedElement, product, [
            'name',
            'packaging',
            'supplierId',
            'releasable',
        ]);
        setIsSaveable(isValid ?? false);
    }, [selectedElement, product]);

    if (isLoadingSupplier && isFetchingSupplier && isLoadingReleaseAbleCode && isFetchingReleaseAbleCode) {
        return <LoadingIndicator loading />;
    }

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Box>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Product Name"
                            fullWidth
                            margin="dense"
                            size="small"
                            required
                            value={product?.name ?? ''}
                            onChange={(e) => updateProduct('name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Atc"
                            fullWidth
                            margin="dense"
                            size="small"
                            value={product?.atc ?? ''}
                            onChange={(e) => updateProduct('atc', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Packaging"
                            fullWidth
                            margin="dense"
                            size="small"
                            required
                            value={product?.packaging ?? ''}
                            onChange={(e) => updateProduct('packaging', e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Description"
                            fullWidth
                            margin="dense"
                            size="small"
                            multiline
                            value={product?.description ?? ''}
                            onChange={(e) => updateProduct('description', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <Autocomplete
                            sx={{ pt: 1 }}
                            fullWidth
                            size="small"
                            options={suppliers!.map((supplier) => supplier.name)}
                            value={MapperUtil.getEntityNameById(suppliers!, product?.supplierId)}
                            onChange={(_e, v) =>
                                updateProduct('supplierId', MapperUtil.getEntityIdByName(suppliers!, v))
                            }
                            renderInput={(params) => <TextField {...params} label="Supplier Name" />}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Distributor"
                            fullWidth
                            margin="dense"
                            size="small"
                            value={product?.distributor ?? ''}
                            onChange={(e) => updateProduct('distributor', e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Inn"
                            fullWidth
                            margin="dense"
                            size="small"
                            value={product?.inn ?? ''}
                            onChange={(e) => updateProduct('inn', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <Autocomplete
                            sx={{ pt: 1 }}
                            fullWidth
                            size="small"
                            options={releaseAbleCodes!.map((releaseAbleCode) => releaseAbleCode.code)}
                            value={product?.releasableBy}
                            onChange={(_e, v) => updateProduct('releasableBy', v)}
                            renderInput={(params) => <TextField {...params} label="Releaseable By" />}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={product?.releasable ?? false}
                                    onChange={(e) => updateProduct('releasable', e.target.checked)}
                                    required
                                />
                            }
                            label="Releasable"
                        />
                    </Grid>
                </Grid>
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
