import React, { FC, useState, useEffect, useContext } from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import FileService from '../../services/FileService';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';
import { ROOT_FOLDER } from '../../configs/constants';

export type FileFormProps = {
    pwd: string;
};

const FileForm: FC<FileFormProps> = ({ pwd }) => {
    const [directoryPath, setDirectoryPath] = useState<string>(pwd);

    const { showSnackbar } = useContext(SnackbarContext);

    useEffect(() => {
        setDirectoryPath(pwd);
    }, [pwd]);

    const handleDelete = (): void => {
        FileService.del(`${ROOT_FOLDER}/${directoryPath}`)
            .then(() => showSnackbar({ severity: 'success', text: `File ${directoryPath} deleted` }))
            .catch((error) =>
                showSnackbar({ severity: 'error', text: `File ${directoryPath} delete failed with: ${error}` })
            );
    };

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={1} sx={{ mb: 2 }} flexDirection="column">
                <Grid item xs={11} display="flex">
                    <TextField
                        label="Present working directory"
                        fullWidth
                        margin="dense"
                        size="small"
                        required
                        value={directoryPath}
                        onChange={(e) => setDirectoryPath(e.target.value)}
                    />
                </Grid>
                <Grid container item flexDirection="row">
                    <Grid item xs={2} display="flex">
                        <Button variant="contained">Upload File</Button>
                    </Grid>
                    <Grid item xs={2} display="flex">
                        <Button variant="contained" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FileForm;
