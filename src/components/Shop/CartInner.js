import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useShopContext } from '../../hooks/ShopProvider';

const List = styled.ul`
    /* list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column; */
    display: flex;
    flex-direction: column;
    background-color: #fff;
    min-width: 350px;
    max-width: 600px;
    border-radius: 8px;
    padding: 0;
    @media (max-width: 380px) {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        min-width: 0;
        border-radius: 8px;
    }
`;
const InnerButtons = styled.button`
    border-radius: 25%;
    padding: 0.5em;
    width: 24px;
    height: 24px;
    border: 2px solid;
    position: relative;

    align-self: center;
`;
const PlusButton = styled(InnerButtons)`
    &::before {
        content: ' ';
        position: absolute;
        display: block;
        background-color: black;
        width: 2px;
        left: 9px;
        top: 5px;
        bottom: 5px;
        transform: rotate(0deg);
    }
    &::after {
        content: ' ';
        position: absolute;
        display: block;
        background-color: black;
        height: 2px;
        top: 9px;
        left: 5px;
        right: 5px;
        transform: rotate(0deg);
    }
`;
const MinusButton = styled(InnerButtons)`
    &::after {
        content: ' ';
        position: absolute;
        display: block;
        background-color: black;
        height: 2px;
        top: 9px;
        left: 5px;
        right: 5px;
        transform: rotate(0deg);
    }
`;
const DeleteAllButton = styled(InnerButtons)`
    &::before {
        content: ' ';
        position: absolute;
        display: block;
        background-color: black;
        width: 2px;
        left: 9px;
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
        top: 9px;
        left: 5px;
        right: 5px;
        transform: rotate(45deg);
    }
`;
const ListItem = styled.li`
    display: grid;
    grid-template-columns: 30px 2.5fr 70px 0.5fr;
    min-height: 48px;
    gap: 7px;
    padding: 5px 10px;
    & > span:not(:nth-child(2)) {
        justify-self: center;
        align-self: center;
    }

    @media (max-width: 380px) {
        display: grid;
        grid-template-columns: 25px 3fr 60px 1fr;
        min-height: 48px;
        gap: 5px;
        font-size: 0.8rem;
    }
`;
const Line = styled.div`
    display: block;
    width: 100%;
    border-bottom: 1px dashed #ccc;
`;
const CardTitle = styled.span`
    margin: 7px 15px;
`;
const PlusMinusWrapper = styled.div`
    align-self: center;
    justify-self: center;
    text-align: center;
    display: inherit;
    grid-template-columns: 1fr 1fr 1fr;
    margin-right: 10px;
    & > span {
        margin: 0 10px;
    }
`;

const CardView = ({ product, addToCart, removeFromCart, removeAllFromCart }) => {
    // add round to two digits function
    const total = Math.round(product.quantity * product.price);
    return (
        <>
            <DeleteAllButton onClick={() => removeAllFromCart(product)}></DeleteAllButton>
            <CardTitle>{product.title}</CardTitle>
            <PlusMinusWrapper>
                <PlusButton onClick={() => addToCart(product)}></PlusButton>
                <span>{product.quantity}</span>
                <MinusButton onClick={() => removeFromCart(product)}></MinusButton>
            </PlusMinusWrapper>
            <span>${total}</span>
        </>
    );
};
const CardData = styled(CardView)``;
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
                    <ListItem key={+new Date().getTime() + i}>
                        {/* <ProductImage src={product.image}></ProductImage>
                        <button
                            onClick={() => shopContext.handleRemoveFromCart(product)}
                            className="btn ms-2">
                            <b>✖</b>
                        </button>
                        <span>
                            {product.title} x {product.quantity}
                        </span> */}
                        <CardData
                            product={product}
                            price={product.price}
                            addToCart={shopContext.handleAddToCart}
                            removeFromCart={shopContext.handleRemoveFromCart}
                            removeAllFromCart={shopContext.removeAllFromCart}
                        />
                    </ListItem>
                );
            });
            setCartView(() =>
                newCart.map((i) => {
                    return (
                        <>
                            {i}
                            <Line></Line>
                        </>
                    );
                })
            );
        } catch (err) {
            console.error(err);
        }
    }, [shopContext, cartInner]);

    return <List>{cartView}</List>;
}
