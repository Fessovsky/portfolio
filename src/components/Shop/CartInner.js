import React, { useEffect } from 'react';
import { useShopContext } from '../../hooks/ShopProvider';

export default function CartInner() {
    console.log('remount inner');
    const shopContext = useShopContext();
    const [cart, setCart] = React.useState([]);
    const [cartView, setCartView] = React.useState();

    useEffect(() => {
        console.log('cartView', cart);
        const newCart = cart.map((product, i) => {
            console.log(product);
            return <li key={+new Date().getTime() + i}>s{product.title}</li>;
        });
        return () => {
            setCartView(newCart);
        };
    }, [cart]);
    useEffect(() => {
        console.log('cart');
        setCart(shopContext.cart.products);
    }, [shopContext.cart.products]);

    return <div>f{cartView}</div>;
}
