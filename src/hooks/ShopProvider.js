import React, { useContext, useState } from 'react';

const ShopContext = React.createContext({});
export const useShopContext = () => {
    return useContext(ShopContext);
};
export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState({ products: [], quantity: 0 });

    const handleAddToCart = (data) => {
        setCart((prevState) => {
            prevState.products.push(data);
            return { ...prevState, quantity: cart.quantity + 1 };
        });
    };
    const handleRemoveFromCart = (data) => {
        setCart((prevState) => {
            if (prevState.quantity === 0) {
                prevState.products = [];
                return prevState;
            }

            let index = prevState.products.findIndex((product) => {
                return data.id === product.id;
            });
            prevState.products.splice(index, 1);
            return { ...prevState, quantity: prevState.quantity - 1 };
        });
    };
    return (
        <ShopContext.Provider
            value={{
                cart: cart,
                handleAddToCart: handleAddToCart,
                handleRemoveFromCart: handleRemoveFromCart
            }}>
            {children}
        </ShopContext.Provider>
    );
};
