import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar/Navbar';
import Search from './components/Search';
import { ShopProvider } from '../../hooks/ShopProvider';

function Shop() {
    console.log('shop mounted');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || null);
    const [hits, setHits] = useState([...Array(3).keys()]);

    useEffect(() => {
        async function getProducts() {
            try {
                console.log('Fetching');
                setIsLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products?limit=5`);
                const data = await response.json();

                setProducts(await data);
            } catch (err) {
                setError(err.message);
                setProducts(null);
            } finally {
                setError(false);
                setIsLoading(false);
            }
        }
        if (products === null) {
            setHits(['9']);
            getProducts();
        }
    }, [products]);

    useEffect(() => {
        return () => {
            localStorage.setItem('products', JSON.stringify(products));
        };
    }, [products]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <ShopProvider>
            {error && <h1>Error: {error.message}</h1>}
            <Navbar />
            <Search setError={setError} setProducts={setProducts} setIsLoading={setIsLoading} />
            <ProductCard products={products} hits={hits} />
        </ShopProvider>
    );
}
Shop.customName = 'Shop';
export default Shop;
