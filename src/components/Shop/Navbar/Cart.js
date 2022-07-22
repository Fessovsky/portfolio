import React from 'react';
import cartImg from './pics/shopping-cart.png';
import { useShopContext } from '../../../hooks/ShopProvider';
import './Cart.css';

export default function Cart() {
    // const [cart, setCart] = useState({});
    const cartContext = useShopContext();
    // cartContext.handleCart((data)=>{return { product: data.name, quantity: cart }});
    // console.log(cartContext);
    // useEffect(() => {
    //     setCart((prevCart) => {
    //         return { ...prevCart, quantity: quantity };
    //     });
    // }, [quantity]);

    return (
        <div className="cart__wrapper">
            <img src={cartImg} alt="Cart" width="24px" />{' '}
            <div className="cart__quantity">
                <span>{cartContext.cart.quantity}</span>
            </div>
        </div>
    );
}
