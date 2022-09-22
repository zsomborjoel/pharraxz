import { GridFilterItem, GridFilterOperator } from '@mui/x-data-grid';
import OrderTypeGridFilter from './OrderTypeGridFIlter';

const OrderOperator: GridFilterOperator[] = [
    {
        label: 'Is',
        value: 'is',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.columnField || !filterItem.value || !filterItem.operatorValue) {
                return null;
            }

            return (params): boolean => params.value === filterItem.value;
        },
        InputComponent: OrderTypeGridFilter,
    },
];

export default OrderOperator;
