import React, { FC, ReactNode, useState, useEffect, useMemo } from 'react';
import { Product } from '../services/model/Product';
import ProductService from '../services/ProductService';

interface ProductProviderProps {
    children: ReactNode;
}

const productsDefault = [] as Product[];
const isLoadigDefault = true;

export const ProductContext = React.createContext({ products: productsDefault, isLoading: isLoadigDefault });

const ProductProvider: FC<ProductProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(isLoadigDefault);
    const [products, setProducts] = useState(productsDefault);

    const getAllProducts = async (): Promise<any> => {
        setIsLoading(true);
        const getAllResponse = await ProductService.getAllProducts();
        setProducts(getAllResponse.data);
        setIsLoading(false);
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const productProviderValue = useMemo(() => ({ products, isLoading }), [products, isLoading]);

    return <ProductContext.Provider value={productProviderValue}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
