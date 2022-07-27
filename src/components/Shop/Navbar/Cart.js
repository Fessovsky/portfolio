import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cartImg from './pics/shopping-cart.png';
import { useShopContext } from '../../../hooks/ShopProvider';
import CartInner from '../CartInner';
import './Cart.css';
const ModalWrapper = styled.div`
    display: block;
    max-width: 400px;
    position: relative;
`;
function Modal({ handleClose }) {
    return (
        <ModalWrapper onClick={handleClose}>
            <div>
                <CartInner />
            </div>
        </ModalWrapper>
    );
}
export default function Cart() {
    const [cartIcon, setCartIcon] = useState({ quantity: 0 });
    const [isShown, setIsShown] = useState(false);

    const shopContext = useShopContext();
    useEffect(() => {
        setCartIcon({ quantity: shopContext.cart.quantity });
        if (shopContext.cart.length === 0) {
            return;
        }
    }, [shopContext]);
    const handleClose = () => setIsShown(false);

    const handleShow = () => setIsShown(true);
    return (
        <div className="cart__wrapper">
            <img onClick={handleShow} src={cartImg} alt="Cart" width="24px" />{' '}
            <div className="cart__quantity">
                <span>{cartIcon.quantity || 0}</span>
            </div>
            {/* <div className="modal">{isShown ? <Modal handleClose={handleClose} /> : 'no'}</div> */}
        </div>
    );
}
