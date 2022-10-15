import React, { FC, useEffect } from 'react';
import 'react-reflex/styles.css';
import '../../styles.css';
import { Box } from '@mui/system';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import TreeDirectory from './TreeDirectory';

export type FilePageProps = {};

const FilePage: FC<FilePageProps> = (): any => {
    useEffect(() => {}, []);

    return (
        <div className="reflex">
            <Box sx={{ height: 900 }}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement size={800} minSize={400} className="left-pane">
                        <TreeDirectory />
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement minSize={600} className="right-pane" propagateDimensions propagateDimensionsRate={1}>
                        <div>test</div>
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </div>
    );
};

export default FilePage;
