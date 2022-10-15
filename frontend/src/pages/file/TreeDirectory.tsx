import React, { FC, useContext, useEffect, useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Folder from '@material-ui/icons/Folder';
import withStyles from '@material-ui/core/styles/withStyles';
import Description from '@material-ui/icons/Description';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import { AxiosResponse } from 'axios';
import FileService from '../../services/FileService';
import { ROOT_FOLDER } from '../../configs/constants';
import { File } from '../../services/model/File';
import FileDownloadDialog from './FileDownloadDialog';
import SnackbarContext from '../../contexts/snackbar/SnackbarContext';

export type TreeDirectoryProps = {
    classes: {
        root: string;
        list: string;
    };
};

const styler = withStyles((theme: any) => ({
    root: {
        width: 800,
    },
    list: {
        marginLeft: theme.spacing(4),
    },
}));

const TreeDirectory: FC<TreeDirectoryProps> = ({ classes }): any => {
    const [paths, setPaths] = useState<string[]>([]);
    const [unfolded, setUnfolded] = useState<any[]>([]);

    const { showSnackbar } = useContext(SnackbarContext);

    const [downloadFilePath, setDownloadFilePath] = useState<string>('');
    const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
    const [isDownloadApproved, setIsDownloadApproved] = useState<boolean>(false);

    const saveFile = (response: AxiosResponse<Blob, any>): void => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = href;

        const headerLine = response.headers['content-disposition'];
        const startFileNameIndex = headerLine.indexOf("'") + 1;
        const endFileNameIndex = headerLine.lastIndexOf("'");
        const filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    const downloadFile = (path: string): void => {
        FileService.download(`${ROOT_FOLDER}/${path}`)
            .then((response) => {
                saveFile(response);
                showSnackbar({ severity: 'success', text: `File ${path} downloaded` });
            })
            .catch((error) => showSnackbar({ severity: 'error', text: `File ${path} download failed with: ${error}` }));
    };

    useEffect(() => {
        if (isDownloadApproved) {
            downloadFile(downloadFilePath);
        }

        setIsDownloadApproved(false);
    }, [isDownloadApproved]);

    const makeItToPaths = (path: string, files: File[]): string[] => {
        const pathList = [] as string[];
        files.forEach((file) => {
            if (file.directory) {
                pathList.push(path ? `${path}${file.fileName}/` : `${file.fileName}/`);
            } else {
                pathList.push(path ? `${path}${file.fileName}` : `${file.fileName}`);
            }
        });

        return pathList;
    };

    useEffect(() => {
        FileService.list(ROOT_FOLDER).then((res) => setPaths(makeItToPaths('', res.data)));
    }, []);

    const fetchNewFiles = (path: string): void => {
        FileService.list(`${ROOT_FOLDER}/${path}`).then((res) =>
            setPaths([...paths, ...makeItToPaths(path, res.data)])
        );
    };

    const handleToggleList = (path: string, fold: boolean): void => {
        if (fold) {
            setUnfolded(unfolded.filter((p) => !p.startsWith(path)));
        } else {
            setUnfolded([...unfolded, path]);
            fetchNewFiles(path);
        }
    };

    const handleDownloadDialog = (path: string): void => {
        setDownloadFilePath(path);
        setIsDownloadOpen(true);
    };

    const renderItem = (pwd: string, path: string, isDir: boolean, childrens: string[]): JSX.Element => {
        const name = path.substr(pwd.length);
        const unfold = unfolded.includes(path);

        /* eslint-disable no-use-before-define */
        /* eslint-disable @typescript-eslint/no-use-before-define */
        return (
            <React.Fragment key={uuidv4()}>
                <ListItemButton
                    divider
                    dense
                    onClick={() => (isDir ? handleToggleList(path, unfold) : handleDownloadDialog(path))}
                >
                    <ListItemIcon>{isDir ? <Folder /> : <Description />}</ListItemIcon>
                    <ListItemText primary={name} />
                    {isDir && (unfold ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <FileDownloadDialog
                    isOpen={isDownloadOpen}
                    setIsOpen={setIsDownloadOpen}
                    setIsDownloadApproved={setIsDownloadApproved}
                    path={downloadFilePath}
                />
                {isDir && (
                    <Collapse in={unfold}>
                        <List className={classes.list}>{renderList(childrens, pwd.concat(name))}</List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };

    const renderList = (paths: string[], pwd = ''): JSX.Element[] => {
        const listItems: JSX.Element[] = [];
        let previous: string | undefined;
        const nestedPaths: string[] = [];
        let isPrevDir = false;

        const sortedPaths = paths.sort((a, b) => b.split('/').length - a.split('/').length || a.localeCompare(b));

        sortedPaths.forEach((path) => {
            const relativePath = path.substr(pwd.length);
            const slices = relativePath.split('/');
            const current = slices[0];

            if (current !== '') {
                if (previous && previous !== current) {
                    listItems.push(renderItem(pwd, pwd.concat(previous, isPrevDir ? '/' : ''), isPrevDir, nestedPaths));
                    nestedPaths.length = 0;
                }

                nestedPaths.push(path);
                previous = current;
                isPrevDir = slices.length > 1;
            }
        });

        if (previous) {
            listItems.push(renderItem(pwd, pwd.concat(previous, isPrevDir ? '/' : ''), isPrevDir, nestedPaths));
        }

        return listItems;
    };

    return (
        <div className={classes.root}>
            <List>{renderList(paths)}</List>
        </div>
    );
};

export default styler(TreeDirectory);
