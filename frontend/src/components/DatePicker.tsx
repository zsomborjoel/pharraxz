import * as React from 'react';
import dayjs from 'dayjs';
import { FC } from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ISO_DATE_FORMAT } from '../configs/constants';

type Props = {
    label: string;
    value: Date | null | undefined;
    onChange: (date: Date | null) => void;
    required?: boolean;
};

const DatePicker: FC<Props> = ({ label, value, onChange, required = false }) => {
    const getLabel = (): JSX.Element | string => {
        if (required) {
            return (
                <div>
                    {label}
                    <span className="MuiInputLabel-asterisk MuiFormLabel-asterisk"> *</span>
                </div>
            );
        }

        return label;
    };

    return (
        <DesktopDatePicker
            label={getLabel()}
            inputFormat="yyyy-MM-dd"
            value={value}
            onChange={(date: any) => onChange(new Date(dayjs(date).format(ISO_DATE_FORMAT)))}
            renderInput={(params: any) => <TextField fullWidth margin="dense" size="small" {...params} />}
        />
    );
};

export default DatePicker;
