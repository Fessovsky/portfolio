import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cartImg from './pics/shopping-cart.png';
import { useShopContext } from '../../../hooks/ShopProvider';
import CartInner from '../CartInner';

const CartQuantity = styled.div`
    color: white;
    background-color: red;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    font-size: 0.5rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    right: 7px;
    top: -2px;
`;
const CartWrapper = styled.div`
    display: flex;
    & > *:first-child {
        cursor: pointer;
    }
`;

const ModalWrapper = styled.div`
    background-color: #ffffff;
    padding: 25px;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 96vw;
    max-width: 770px;
    @media (max-width: 400px) {
        padding: 10px 4px;
    }
`;
const CloseButton = styled.button`
    border-radius: 50%;
    padding: 0.5em;
    width: 30px;
    height: 30px;
    border: 2px solid;
    position: absolute;
    top: -5px;
    right: -5px;
    &::before {
        content: ' ';
        position: absolute;
        display: block;
        background-color: black;
        width: 2px;
        left: 12px;
        top: 5px;
        bottom: 5px;
        transform: rotate(45deg);
    }
    &::after {
        content: ' ';
        position: absolute;
        display: block;
        background-color: black;
        height: 2px;
        top: 12px;
        left: 5px;
        right: 5px;
        transform: rotate(45deg);
    }
`;
const BlackOut = styled.div`
    background-color: #000000ba;
    z-index: 999;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;
function Modal({ handleClose }) {
    return (
        <ModalWrapper>
            <CloseButton onClick={handleClose}></CloseButton>
            <CartInner closeModal={handleClose} />
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

    const handleClose = () => {
        setIsShown(false);
    };
    const handleShow = () => {
        if (shopContext.cart.products.length > 0) setIsShown(true);
    };

    useEffect(() => {
        if (isShown) {
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = '';
        }
    }, [isShown]);
    return (
        <CartWrapper onClick={() => !isShown && handleShow()}>
            <img src={cartImg} alt="Cart" width="24px" />{' '}
            <CartQuantity>
                <span>{cartIcon.quantity || 0}</span>
            </CartQuantity>
            {isShown ? (
                <>
                    <Modal handleClose={handleClose} />
                    <BlackOut onClick={handleClose}></BlackOut>
                </>
            ) : undefined}
        </CartWrapper>
    );
}
