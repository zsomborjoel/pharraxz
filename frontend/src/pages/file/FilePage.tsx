import React, { FC } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { Box } from '@mui/system';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import TreeDirectory from './TreeDirectory';
import FileForm from './FileForm';
import { FileContextProvider } from '../../context/FileContextProvider';

export type FilePageProps = {};

const FilePage: FC<FilePageProps> = (): any => (
    <div className="reflex">
        <FileContextProvider>
            <Box sx={{ height: 900 }}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement size={900} minSize={400} className="left-pane">
                        <TreeDirectory />
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement minSize={600} className="right-pane" propagateDimensions propagateDimensionsRate={1}>
                        <FileForm />
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </FileContextProvider>
    </div>
);

export default FilePage;
