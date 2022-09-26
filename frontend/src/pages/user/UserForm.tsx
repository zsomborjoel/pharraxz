import React, { FC, useEffect, useState, useContext } from 'react';
import { Box, Grid, Button, TextField, Autocomplete } from '@mui/material';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';
import { handleError } from '../../utils/ErrorHandler';
import SaveUtil from '../../utils/SaveUtil';
import { User } from '../../services/model/User';
import { useDeleteUser, useSaveUser } from '../../queries/UserQuery';
import LoadingIndicator from '../../components/LoadingIndicator';
import MapperUtil from '../../utils/MapperUtil';
import { useGetAllUserPosition } from '../../queries/UserPositionQuery';
import { useGetAllRole } from '../../queries/RoleQuery';

export type UserFormProps = {
    selectedElement: User;
    onSave: (user: User) => void;
    onDelete: (userId: string) => void;
};

const UserForm: FC<UserFormProps> = ({ selectedElement, onSave, onDelete }) => {
    const [user, setUser] = useState<User | null>(selectedElement);

    const [isSaveable, setIsSaveable] = useState<boolean>(false);
    const [isNewUser, setIsNewUser] = useState<boolean>(false);

    const { showSnackbar } = useContext(SnackbarContext);

    const { data: userPositions } = useGetAllUserPosition();
    const { data: roles } = useGetAllRole();

    const { mutate: deleteUserMutate } = useDeleteUser();
    const { mutate: saveUserMutate } = useSaveUser();

    const initializeForm = (): void => {
        setUser(selectedElement);

        setIsNewUser(false);
        setIsSaveable(false);
    };

    const clearFormForNewUser = (): void => {
        setIsNewUser(true);
        setUser(null);
    };

    const deleteUser = (): void => {
        deleteUserMutate(selectedElement.id!, {
            onSuccess: () => {
                onDelete(`${selectedElement.id!}`);
                showSnackbar({ severity: 'success', text: 'Successfully deleted.' });
            },
            onError: (error) => {
                handleError(error);
            },
        });
    };

    const saveUser = (): void => {
        saveUserMutate(user!, {
            onSuccess(id) {
                onSave({ ...user!, id });
                setIsSaveable(false);
                showSnackbar({ severity: 'success', text: 'Successfully saved.' });
            },
            onError(error) {
                handleError(error);
            },
        });
    };

    const updateUser = (property: keyof User, value: any): void => {
        setUser({ ...user, [property]: value } as User);
    };

    useEffect(() => {
        initializeForm();
    }, [selectedElement]);

    useEffect(() => {
        const isValid = SaveUtil.isSaveEnabled(selectedElement, user, ['firstname', 'lastname', 'username', 'roleId']);
        setIsSaveable(isValid ?? false);
    }, [selectedElement, user]);

    if (userPositions === undefined) {
        return <LoadingIndicator loading />;
    }

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Box>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="First Name"
                            fullWidth
                            margin="dense"
                            size="small"
                            required
                            value={user?.firstname ?? ''}
                            onChange={(e) => updateUser('firstname', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Last Name"
                            fullWidth
                            margin="dense"
                            size="small"
                            required
                            value={user?.lastname ?? ''}
                            onChange={(e) => updateUser('lastname', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="User Name"
                            fullWidth
                            margin="dense"
                            size="small"
                            required
                            value={user?.username ?? ''}
                            onChange={(e) => updateUser('username', e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={4} display="flex">
                        <TextField
                            label="Password"
                            fullWidth
                            margin="dense"
                            size="small"
                            value={user?.password ?? ''}
                            onChange={(e) => updateUser('password', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <Autocomplete
                            sx={{ pt: 1 }}
                            fullWidth
                            size="small"
                            options={userPositions!.map((userPosition) => userPosition.name)}
                            value={MapperUtil.getEntityNameById(userPositions!, user?.userPositionId)}
                            onChange={(_e, v) =>
                                updateUser('userPositionId', MapperUtil.getEntityIdByName(userPositions!, v))
                            }
                            renderInput={(params) => <TextField {...params} label="Position" />}
                        />
                    </Grid>
                    <Grid item xs={4} display="flex">
                        <Autocomplete
                            sx={{ pt: 1 }}
                            fullWidth
                            size="small"
                            options={roles!.map((role) => role.name)}
                            value={MapperUtil.getEntityNameById(roles!, user?.roleId)}
                            onChange={(_e, v) => updateUser('roleId', MapperUtil.getEntityIdByName(roles!, v))}
                            renderInput={(params) => <TextField required {...params} label="Roles" />}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={6} display="flex" sx={{ mt: 6 }}>
                        <Button sx={{ width: 140 }} disabled={!isSaveable} onClick={saveUser} variant="contained">
                            Save
                        </Button>
                        <Button
                            sx={{ width: 140, ml: 1 }}
                            variant="outlined"
                            disabled={isNewUser}
                            onClick={clearFormForNewUser}
                        >
                            Add new
                        </Button>
                    </Grid>
                    <Grid item xs={6} display="flex" sx={{ mt: 6 }} justifyContent="flex-end">
                        <Button sx={{ mr: 6, width: 140 }} variant="contained" color="error" onClick={deleteUser}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UserForm;
