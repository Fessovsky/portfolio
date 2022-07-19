import React, { useEffect, useState } from 'react';
import cartImg from './pics/shopping-cart.png';
import './Cart.css';

export default function Cart({ quantity }) {
    const [cart, setCart] = useState({});
    useEffect(() => {
        setCart((prevCart) => {
            return { ...prevCart, quantity: quantity };
        });
    }, [quantity]);

    return (
        <div className="cart__wrapper">
            <img src={cartImg} alt="Cart" width="24px" />{' '}
            <div className="cart__quantity">
                <span>{cart.quantity}</span>
            </div>
        </div>
    );
}
