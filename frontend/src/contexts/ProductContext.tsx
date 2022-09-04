import React, { FC, ReactNode, useState, useEffect, useMemo, createContext } from 'react';
import { Product } from '../services/model/Product';
import ProductService from '../services/ProductService';

interface ProductProviderProps {
    children: ReactNode;
}

const productsDefault = [] as Product[];
const isLoadigDefault = true;

export const ProductContext = createContext({ products: productsDefault, isLoading: isLoadigDefault });

const ProductProvider: FC<ProductProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(isLoadigDefault);
    const [products, setProducts] = useState(productsDefault);

    const getAllProducts = async (): Promise<void> => {
        setIsLoading(true);
        const getAllResponse = await ProductService.getAll();
        const productsWithId = getAllResponse.data.map((product: Product) => ({ ...product, id: product.name }));
        setProducts(productsWithId);
        setIsLoading(false);
    };

    const saveProduct = async (product: Product): Promise<void> => {
        setIsLoading(true);
        const savedProduct = await ProductService.save(product);
        products.push(savedProduct.data);
        setProducts(products);
        setIsLoading(false);
    };

    const deleteProduct = async (id: string): Promise<void> => {
        setIsLoading(true);
        const done = await ProductService.del(id);

        if (done) {
            const filtered = products.filter((product) => product.name !== id);
            setProducts(filtered);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const productProviderValue = useMemo(
        () => ({ products, isLoading, saveProduct, deleteProduct }),
        [products, isLoading, saveProduct, deleteProduct]
    );

    return <ProductContext.Provider value={productProviderValue}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
