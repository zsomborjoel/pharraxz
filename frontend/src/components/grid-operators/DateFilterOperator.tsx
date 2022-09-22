import { getGridDateOperators, GridFilterOperator } from '@mui/x-data-grid';
import DatePickerFilter from './DatePickerFilter';

const DateFilterOperator = (): GridFilterOperator[] =>
    getGridDateOperators()?.map((fo) => ({ ...fo, InputComponent: DatePickerFilter }));

export default DateFilterOperator;
