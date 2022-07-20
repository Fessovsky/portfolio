import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar/Navbar';
import { ShopProvider } from '../../hooks/ShopProvider';

// const Banner = () => {
//     return <div>Banner</div>;
// };
const wallMartAPI =
    'https://api.bluecartapi.com/request?api_key=demo&type=search&search_term=highlighter+pens&sort_by=best_seller';
function Shop() {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || null);

    useEffect(() => {
        async function getProducts() {
            try {
                console.log('Fetching');
                setIsLoading(true);
                const response = await fetch(wallMartAPI);
                const data = await response.json();

                setProducts(await data.search_results);
            } catch (err) {
                setError(err.message);
                setProducts(null);
            } finally {
                setIsLoading(false);
            }
        }
        if (products === null) {
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
            {error && <h1>Error: {`${error.message}`}</h1>}
            <Navbar />
            <ProductCard products={products} />
        </ShopProvider>
    );
}
Shop.customName = 'Shop';
export default Shop();
