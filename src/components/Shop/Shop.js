import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar/Navbar';
import { ShopProvider } from '../../hooks/ShopProvider';

// const Banner = () => {
//     return <div>Banner</div>;
// };

function Shop() {
    console.log('shop mounted');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || null);
    const [hits, setHits] = useState([]);
    const [search, setSearch] = useState();
    useEffect(() => {
        async function getProducts() {
            try {
                console.log('Fetching');
                let fetchParams = search;
                setIsLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products${fetchParams}`);
                const data = await response.json();
                console.log(await data);
                setProducts(await data);
            } catch (err) {
                setError(err.message);
                setProducts(null);
            } finally {
                setIsLoading(false);
            }
        }
        if (products === null) {
            setSearch('?limit=8');
            setHits(['9']);
            getProducts();
        }
    }, [products, search]);

    useEffect(() => {
        return () => {
            localStorage.setItem('products', JSON.stringify(products));
        };
    }, [products]);

    async function handleSearch() {
        try {
            console.log('Fetching');
            let fetchParams = search;
            setIsLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products${fetchParams}`);
            const data = await response.json();

            setProducts(await data);
        } catch (err) {
            setError(err.message);
            setProducts(null);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <ShopProvider>
            {error && <h1>Error: {`${error.message}`}</h1>}
            <Navbar />
            <button className="btn btn-dark" onClick={handleSearch}>
                Search
            </button>

            <ProductCard products={products} hits={hits} />
        </ShopProvider>
    );
}
Shop.customName = 'Shop';
export default Shop;
