/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC, useEffect, useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Folder from '@material-ui/icons/Folder';
import withStyles from '@material-ui/core/styles/withStyles';
import Description from '@material-ui/icons/Description';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FileService from '../../services/FileService';
import { ROOT_FOLDER } from '../../configs/constants';
import { File } from '../../services/model/File';

export type TreeDirectoryProps = {
    classes: {
        root: string;
        list: string;
    };
};

const styler = withStyles((theme: any) => ({
    root: {
        width: 400,
    },
    list: {
        marginLeft: theme.spacing(4),
    },
}));

const TreeDirectory: FC<TreeDirectoryProps> = ({ classes }): any => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [paths, setPaths] = useState<string[]>([]);
    const [unfolded, setUnfolded] = useState<any[]>([]);

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

    const renderItem = (pwd: string, path: string, isDir: boolean, childrens: string[]): JSX.Element => {
        const name = path.substr(pwd.length);
        const unfold = unfolded.includes(path);

        return (
            <React.Fragment key={path}>
                <ListItemButton divider dense onClick={() => isDir && handleToggleList(path, unfold)}>
                    <ListItemIcon>{isDir ? <Folder /> : <Description />}</ListItemIcon>
                    <ListItemText primary={name} />
                    {isDir && (unfold ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
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
