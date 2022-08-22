import React, { FC, ElementType, useEffect, useState, ReactElement } from 'react';
import { Box } from '@mui/material';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { DataGrid, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

type Props = {
    rows: any[],
    columns: GridColDef[],
    sortModelInitialState?: GridSortModel,
    detailedView: ElementType,
    pageUrl: string,
}

type UrlParams = {
    id: string;
}

const TableAndDetailsLayout: FC<Props> = ({ pageUrl, rows, columns, sortModelInitialState, detailedView: DetailedView }) => {
    if (!rows.length) {
        return <LoadingIndicator loading />;
    }

    const [tableRows, setTableRows] = useState<any[]>(rows);
    const [selectedRow, setSelectedRow] = useState<any>();
    const [sortModel] = useState<GridSortModel | undefined>(sortModelInitialState);
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

    const { id } = useParams<UrlParams>();

    const selectRow = (elementId: string): void => {
        const newUrl = `${pageUrl}/${elementId}`;
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

        const selectedElement = tableRows.find((element) => element.id === elementId);
        setSelectedRow(selectedElement);
    };

    const updateElementInTableView = (element: any): void => {
        const updatedTableRows = tableRows.map((row) => row.id === element.id ? element : row);

        if (updatedTableRows.indexOf(element) === -1) {
            updatedTableRows.push(element);
        }

        setTableRows(updatedTableRows);
    };

    const deleteElementInTableView = (element: any): void => {
        const filteredTableRows = tableRows.filter((row) => row.id !== element.id);
        setTableRows(filteredTableRows);
    };

    const renderDetailedView = (): ReactElement => {
        if (!selectedRow) {
            return <LoadingIndicator loading />
        }

        return <DetailedView selectedElement={selectedRow} onSave={updateElementInTableView} onDelete={deleteElementInTableView}/>
    }

    useEffect(() => {
        let elementId = tableRows[0].id;

        if (id) {
            elementId = id;
        }

        setSelectionModel([elementId]);
        selectRow(elementId);
    },[]);

    return (
        <div className="reflex">
            <Box sx={{ height: 850 }}>
                <ReflexContainer orientation="vertical">
                    <ReflexElement size={850} minSize={400} className="left-pane">
                        <DataGrid
                            getRowId={(row) => row.id}
                            rows={tableRows}
                            columns={columns}
                            pageSize={100}
                            rowsPerPageOptions={[100]}
                            onRowClick={(params) => selectRow(params.row.id)}
                            sortModel={sortModel}
                            selectionModel={selectionModel}
                            onSelectionModelChange={setSelectionModel}
                            loading={!tableRows.length}
                        />
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement minSize={600} className="right-pane" propagateDimensions propagateDimensionsRate={1}>
                        {renderDetailedView()}
                    </ReflexElement>
                </ReflexContainer>
            </Box>
        </div>
    );
};

export default TableAndDetailsLayout;