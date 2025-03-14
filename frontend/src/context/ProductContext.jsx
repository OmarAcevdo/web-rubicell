import React, { useEffect, useState, createContext } from 'react'

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8080/api/v1/productos');
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;