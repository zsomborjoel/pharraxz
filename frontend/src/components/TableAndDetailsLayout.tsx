import React, { FC, ElementType, useEffect, useState, ReactElement } from 'react';
import { Box } from '@mui/material';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { DataGrid, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

type Props = {
    rows: any[];
    columns: GridColDef[];
    sortModelInitialState?: GridSortModel;
    detailedView: ElementType;
    pageUrl: string;
};

type UrlParams = {
    id: string;
};

const TableAndDetailsLayout: FC<Props> = ({
    pageUrl,
    rows,
    columns,
    sortModelInitialState,
    detailedView: DetailedView,
}) => {
    if (!rows.length) {
        return <LoadingIndicator loading />;
    }

    const [tableRows, setTableRows] = useState<any[]>(rows);
    const [selectedRow, setSelectedRow] = useState<any>();
    const [sortModel, setSortModel] = useState<GridSortModel | undefined>(sortModelInitialState);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    const { id } = useParams<UrlParams>();

    const getFirstElement = (): any => {
        if (tableRows.length > 0) {
            return tableRows[0];
        }

        return null;
    };

    const selectRow = (element: any): void => {
        const newUrl = `${pageUrl}/${encodeURIComponent(element?.id ?? '')}`;
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

        setSelectionModel([element?.id ?? '']);
        setSelectedRow(element);
    };

    const updateElementInTableView = (element: any): void => {
        let isExistingElement = false;

        const updatedTableRows = tableRows.map((row) => {
            if (row.id === element.id) {
                isExistingElement = true;
                return element;
            }

            return row;
        });

        if (!isExistingElement) {
            updatedTableRows.push(element);
        }

        setTableRows(updatedTableRows);
        selectRow(element);
    };

    const deleteElementInTableView = (elementId: string): void => {
        const filteredTableRows = tableRows.filter((row) => row.id !== elementId);

        setTableRows(filteredTableRows);
        selectRow(null);
    };

    const renderDetailedView = (): ReactElement => {
        if (!selectedRow) {
            return (
                <Box display="flex" justifyContent="center">
                    No row selected
                </Box>
            );
        }

        return (
            <DetailedView
                selectedElement={selectedRow}
                onSave={updateElementInTableView}
                onDelete={deleteElementInTableView}
            />
        );
    };

    useEffect(() => {
        setTableRows(rows);
    }, [rows]);

    useEffect(() => {
        if (tableRows.length > 0 && !selectedRow) {
            let selectedElement;

            if (id) {
                selectedElement = tableRows.find((element) => element.id.toString() === id);
            } else {
                selectedElement = getFirstElement();
            }

            selectRow(selectedElement);
        }
    }, [tableRows]);

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
                            onSortModelChange={setSortModel}
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
