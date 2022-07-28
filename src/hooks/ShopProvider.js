import React, { useContext, useState } from 'react';

const ShopContext = React.createContext({});
export const useShopContext = () => {
    return useContext(ShopContext);
};
export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState({ products: [], quantity: 0 });

    const handleAddToCart = (data) => {
        setCart((prevState) => {
            if (
                !!prevState.products.find((i) => {
                    return i.id === data.id;
                })
            ) {
                prevState.products = prevState.products.map((item) => {
                    if (item.id === data.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });

                return { ...prevState, quantity: cart.quantity + 1 };
            } else {
                data = { ...data, quantity: 1 };
                prevState.products.push(data);
                return { ...prevState, quantity: cart.quantity + 1 };
            }
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
            if (prevState.products[index].quantity === 1) {
                prevState.products.splice(index, 1);
            } else {
                prevState.products[index].quantity -= 1;
            }
            return { ...prevState, quantity: prevState.quantity - 1 };
        });
    };
    const removeAllFromCart = (data) => {
        setCart((prevState) => {
            let index = prevState.products.findIndex((product) => {
                return data.id === product.id;
            });
            prevState.products.splice(index, 1);
            return { ...prevState, quantity: prevState.quantity - data.quantity };
        });
    };
    return (
        <ShopContext.Provider
            value={{
                cart: cart,
                setCart: setCart,
                handleAddToCart: handleAddToCart,
                handleRemoveFromCart: handleRemoveFromCart,
                removeAllFromCart: removeAllFromCart
            }}>
            {children}
        </ShopContext.Provider>
    );
};
