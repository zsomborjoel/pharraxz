import { GridSelectionModel } from '@mui/x-data-grid';

class DataGridUtil {
    static selectFirst = (
        selectedId: string | undefined,
        firstId: any,
        selectionModel: GridSelectionModel,
        setSelectionModel: (m: GridSelectionModel) => void,
        selectEntity: (id: any) => void,
    ): void => {
        if (!selectedId) {
            if (selectionModel.length === 0) {
                setSelectionModel([firstId]);
                selectEntity(firstId);
            }
        } else if (selectionModel.length === 0) {
            setSelectionModel([selectedId]);
        }
    };
}

export default DataGridUtil;
