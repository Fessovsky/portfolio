import React from 'react';
import './ProductCard.css';
// const a = {
//     id: 1,
//     title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
//     price: 109.95,
//     description:
//         'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//     category: "men's clothing",
//     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//     rating: {
//         rate: 3.9,
//         count: 120
//     }
// };
export default function ProductCard({ products, hits }) {
    if (products === null) {
        return <h4>No products</h4>;
    }
    const productList = products.map((item) => {
        let hit = !!hits.filter((hit) => item.id === +hit)[0];

        return (
            <li className="product_list__item" key={item.id}>
                {hit && <div className="product_list__item__hit">hit</div>}
                <img className="product_list__item__img" src={item.image} alt={item.title.slice(0, 10)} />
                <p>{item.title}</p>
                <p>${item.price}</p>
                <button className="product_list__item__button btn">Add to cart</button>
            </li>
        );
    });
    return <ul className="products__list">{productList}</ul>;
}
