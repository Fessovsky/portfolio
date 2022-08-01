import React from 'react';

export default function Search({ setIsLoading, setError, setProducts }) {
    const [inputQuantity, setInputQuantity] = React.useState('4');
    const [inputCategory, setInputCategory] = React.useState('all');
    async function handleSearch() {
        try {
            console.log('Fetching');
            let fetchParams =
                inputCategory === 'all'
                    ? '?limit=' + inputQuantity
                    : '/category/' + inputCategory + '?limit=' + inputQuantity;

            console.log(fetchParams);
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

    const handleQuantity = (e) => {
        setInputQuantity(e.target.value);
    };
    const handleCategory = (e) => {
        setInputCategory(e.target.value);
    };
    return (
        <div>
            {' '}
            <button className="btn btn-dark" onClick={handleSearch}>
                Search
            </button>
            <select value={inputQuantity} onChange={handleQuantity}>
                <option value="4">4</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="50">50</option>
            </select>
            <select value={inputCategory} onChange={handleCategory}>
                <option value="all">Show all categories</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's clothing</option>
                <option value="women's clothing">Women's clothing</option>
            </select>
        </div>
    );
}
