import React, { FC } from 'react';
import { GridFilterInputValueProps } from '@mui/x-data-grid';
import OrderTypeDropdown from '../OrderTypeDropdown';

const OrderTypeGridFilter: FC<GridFilterInputValueProps> = (props) => {
    const { item, applyValue } = props;

    const handleFilterChange = (newValue: any): void => {
        applyValue({ ...item, value: newValue });
    };

    return <OrderTypeDropdown label="Select value" value={item.value} onSelect={handleFilterChange} />;
};

export default OrderTypeGridFilter;
