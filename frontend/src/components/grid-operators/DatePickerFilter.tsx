import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { GridFilterInputValueProps } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

const DatePickerFilter: FC<GridFilterInputValueProps> = (props: GridFilterInputValueProps): any => {
    const { item, applyValue } = props;

    const handleFilterChange = (newValue: any): void => {
        applyValue({
            ...item,
            value: format(Date.parse(newValue.toLocaleDateString()), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
        });
    };

    return (
        <DatePicker
            value={item.value}
            onChange={(newValue) => handleFilterChange(newValue)}
            renderInput={(params) => <TextField size="small" margin="dense" {...params} />}
        />
    );
};

export default DatePickerFilter;
