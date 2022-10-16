import React, { FC, useState, useEffect, useContext } from 'react';
import { Box, Grid, TextField, Button, Input } from '@mui/material';
import FileService from '../../services/FileService';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';
import { ROOT_FOLDER } from '../../configs/constants';

export type FileFormProps = {
    pwd: string;
    setDeletedPath(path: string): void;
    setIsFileUploaded(flag: boolean): void;
};

const FileForm: FC<FileFormProps> = ({ pwd, setDeletedPath, setIsFileUploaded }) => {
    const [selectedPath, setSelectedPath] = useState<string>(pwd);
    const [selectedFile, setSelectedFile] = useState<File>();

    const { showSnackbar } = useContext(SnackbarContext);

    useEffect(() => {
        setSelectedPath(pwd);
    }, [pwd]);

    const handleDelete = (): void => {
        FileService.del(`${ROOT_FOLDER}/${selectedPath}`)
            .then(() => {
                setDeletedPath(selectedPath);
                showSnackbar({ severity: 'success', text: `File ${selectedPath} deleted` });
            })
            .catch((error) =>
                showSnackbar({ severity: 'error', text: `File ${selectedPath} delete failed with: ${error}` })
            );
    };

    const handleUpload = (): void => {
        const formData = new FormData();
        formData.append('file', selectedFile!, selectedFile?.name);
        FileService.upload(`${ROOT_FOLDER}/${selectedPath}`, formData)
            .then(() => {
                setIsFileUploaded(true);
                showSnackbar({ severity: 'success', text: `File ${selectedFile?.name} uploaded` });
            })
            .catch((error) =>
                showSnackbar({ severity: 'error', text: `File ${selectedFile?.name} upload failed with: ${error}` })
            );
    };

    const onFileChange = (event: any): void => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 1, paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={2} flexDirection="row">
                <Grid item xs={8} display="flex">
                    <TextField
                        label="Present working directory / File"
                        fullWidth
                        margin="dense"
                        size="small"
                        required
                        value={selectedPath}
                        onChange={(e) => setSelectedPath(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3} display="flex">
                    <Button variant="contained" onClick={handleDelete}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} flexDirection="row" sx={{ mt: 2 }}>
                <Grid item xs={3} display="flex">
                    <Input type="file" onChange={onFileChange} />
                </Grid>
                <Grid item xs={2} display="flex">
                    <Button variant="contained" onClick={handleUpload}>
                        Upload File
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FileForm;
