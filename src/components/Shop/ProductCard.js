import React from 'react';
import './ProductCard.css';

export default function ProductCard({ products }) {
    if (products === null) {
        return <h4>No products</h4>;
    }
    const productList = products.map((item) => {
        return (
            <li className="product_list__item" key={item.product.product_id}>
                <img
                    className="product_list__item__img"
                    src={item.product.main_image}
                    alt={item.product.title.slice(0, 10)}
                />
                <p>{item.product.title}</p>
            </li>
        );
    });
    return <ul className="products__list">{productList}</ul>;
}
