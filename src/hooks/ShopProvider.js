import React, { useContext, useState } from 'react';

const ShopContext = React.createContext({});
export const useShopContext = () => {
    return useContext(ShopContext);
};
export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState({});

    const handleCart = (data) => setCart(data);

    return (
        <ShopContext.Provider
            value={{
                cart: cart,
                handleCart: handleCart
            }}>
            {children}
        </ShopContext.Provider>
    );
};
