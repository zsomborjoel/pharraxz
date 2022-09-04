import React, { FC, ReactNode, useState, useEffect, useMemo, createContext } from 'react';
import { Supplier } from '../services/model/Supplier';
import SupplierService from '../services/SupplierService';

interface SupplierProviderProps {
    children: ReactNode;
}

const suppliersDefault = [] as Supplier[];
const isLoadigDefault = true;

export const SupplierContext = createContext({ suppliers: suppliersDefault, isLoading: isLoadigDefault });

const SupplierProvider: FC<SupplierProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(isLoadigDefault);
    const [suppliers, setSuppliers] = useState(suppliersDefault);

    const getAllSuppliers = async (): Promise<void> => {
        setIsLoading(true);
        const getAllResponse = await SupplierService.getAll();
        setSuppliers(getAllResponse.data);
        setIsLoading(false);
    };

    useEffect(() => {
        getAllSuppliers();
    }, []);

    const productProviderValue = useMemo(() => ({ suppliers, isLoading }), [suppliers, isLoading]);

    return <SupplierContext.Provider value={productProviderValue}>{children}</SupplierContext.Provider>;
};

export default SupplierProvider;
