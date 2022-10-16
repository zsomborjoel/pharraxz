import React, { FC, useState } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { Box } from '@mui/system';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import TreeDirectory from './TreeDirectory';
import FileForm from './FileForm';

export type FilePageProps = {};

const FilePage: FC<FilePageProps> = (): any => {
    const [pwd, setPwd] = useState<string>('');
    const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
    const [deletedPath, setDeletedPath] = useState<string>('');

    return (
        <div className="reflex">
            <Box sx={{ height: 900 }}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement size={900} minSize={400} className="left-pane">
                        <TreeDirectory
                            setPwd={setPwd}
                            deletedPath={deletedPath}
                            isFileUploaded={isFileUploaded}
                            setIsFileUploaded={setIsFileUploaded}
                        />
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement minSize={600} className="right-pane" propagateDimensions propagateDimensionsRate={1}>
                        <FileForm pwd={pwd} setDeletedPath={setDeletedPath} setIsFileUploaded={setIsFileUploaded} />
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </div>
    );
};

export default FilePage;
