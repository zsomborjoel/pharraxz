import React, { FC, useEffect, useState, useContext } from 'react';
import { Box, Grid, Button, TextField } from '@mui/material';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';
import { handleError } from '../../utils/ErrorHandler';
import SaveUtil from '../../utils/SaveUtil';
import { useDeleteSupplier, useSaveSupplier } from '../../queries/SupplierQuery';
import { Supplier } from '../../services/model/Supplier';

export type SupplierFormProps = {
    selectedElement: Supplier;
    onSave: (supplier: Supplier) => void;
    onDelete: (supplierId: string) => void;
};

const SupplierForm: FC<SupplierFormProps> = ({ selectedElement, onSave, onDelete }) => {
    const [supplier, setSupplier] = useState<Supplier | null>(selectedElement);

    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [isNewSupplier, setIsNewSupplier] = useState<boolean>(false);

    const { showSnackbar } = useContext(SnackbarContext);

    const { mutate: deleteSupplierMutate } = useDeleteSupplier();
    const { mutate: saveSupplierMutate } = useSaveSupplier();

    const initializeForm = (): void => {
        setSupplier(selectedElement);

        setIsNewSupplier(false);
        setIsSaveable(false);
    };

    const clearFormForNewSupplier = (): void => {
        setIsNewSupplier(true);
        setSupplier(null);
    };

    const deleteProduct = (): void => {
        deleteSupplierMutate(selectedElement.id!, {
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
        saveSupplierMutate(supplier!, {
            onSuccess(id) {
                onSave({ ...supplier!, id });
                setIsSaveable(false);
                showSnackbar({ severity: 'success', text: 'Successfully saved.' });
            },
            onError(error) {
                handleError(error);
            },
        });
    };

    const updateSupplier = (property: keyof Supplier, value: any): void => {
        setSupplier({ ...supplier, [property]: value } as Supplier);
    };

    useEffect(() => {
        initializeForm();
    }, [selectedElement]);

    useEffect(() => {
        const isValid = SaveUtil.isSaveEnabled(selectedElement, supplier, ['name', 'address', 'email']);
        setIsSaveable(isValid ?? false);
    }, [selectedElement, supplier]);

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Box>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Supplier Name"
                            fullWidth
                            margin="dense"
                            size="small"
                            required
                            value={supplier?.name ?? ''}
                            onChange={(e) => updateSupplier('name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Address"
                            fullWidth
                            margin="dense"
                            size="small"
                            required
                            value={supplier?.address ?? ''}
                            onChange={(e) => updateSupplier('address', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Email"
                            fullWidth
                            margin="dense"
                            size="small"
                            required
                            value={supplier?.email ?? ''}
                            onChange={(e) => updateSupplier('email', e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Phone"
                            fullWidth
                            margin="dense"
                            size="small"
                            value={supplier?.phone ?? ''}
                            onChange={(e) => updateSupplier('phone', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={8} display="flex">
                        <TextField
                            label="Description"
                            fullWidth
                            margin="dense"
                            size="small"
                            multiline
                            value={supplier?.description ?? ''}
                            onChange={(e) => updateSupplier('description', e.target.value)}
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
                            disabled={isNewSupplier}
                            onClick={clearFormForNewSupplier}
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

export default SupplierForm;
