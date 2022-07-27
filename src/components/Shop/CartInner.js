import React, { useEffect } from 'react';
import { useShopContext } from '../../hooks/ShopProvider';

export default function CartInner() {
    console.log('remount inner');
    const shopContext = useShopContext();
    const [cartInner, setCartInner] = React.useState([]);
    const [cartView, setCartView] = React.useState();

    useEffect(() => {
        try {
            setCartInner(shopContext.cart.products);
            const newCart = cartInner.map((product, i) => {
                return (
                    <div key={+new Date().getTime() + i}>
                        {product.title} x {product.quantity}
                        <button
                            onClick={() => shopContext.handleRemoveFromCart(product)}
                            className="btn ms-2">
                            <b>X</b>
                        </button>
                    </div>
                );
            });
            setCartView(newCart);
        } catch (err) {
            console.error(err);
        }
    }, [shopContext, cartInner]);

    return <div>{cartView}</div>;
}

// setCartIcon(
//     shopContext.cart.reduce((acc, obj) => {
//         return acc + obj.quantity * obj.price;
//     }, 0)
// );
