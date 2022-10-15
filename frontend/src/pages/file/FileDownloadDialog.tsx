import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, DialogContentText } from '@mui/material';

export type FileDownloadDialogProps = {
    isOpen: boolean;
    setIsOpen(flag: boolean): void;
    setIsDownloadApproved(flag: boolean): void;
    path: string;
};

const FileDownloadDialog: FC<FileDownloadDialogProps> = ({ isOpen, setIsOpen, setIsDownloadApproved, path }): any => {
    const handleClose = (): void => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Would you like download file?</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Selected file path is ${path}`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleClose();
                        setIsDownloadApproved(false);
                    }}
                >
                    No
                </Button>
                <Button
                    onClick={() => {
                        handleClose();
                        setIsDownloadApproved(true);
                    }}
                    autoFocus
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileDownloadDialog;
