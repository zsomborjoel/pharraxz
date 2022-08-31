import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { FC } from 'react';
import { OrderType } from '../../services/enum/OrderType';

type Props = {
    label: string;
    value: string | null;
    setValue: (value: string) => void;
    disabled?: boolean;
};

const OrderTypeDropdown: FC<Props> = ({ label, value, setValue, disabled }) => (
    <FormControl margin="dense" size="small" fullWidth disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <Select label={label} value={value || ''} onChange={(e) => setValue(e.target.value || '')}>
            {Object.keys(OrderType).map((key) => (
                <MenuItem key={key} value={key}>
                    {OrderType[key as keyof typeof OrderType]}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default OrderTypeDropdown;
