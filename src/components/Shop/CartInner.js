import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useShopContext } from '../../hooks/ShopProvider';
import nextId from 'react-id-generator';

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
    max-width: 770px;
    border-radius: 8px;
    padding: 0;
    overflow: scroll;
    max-height: 300px;
    @media (max-width: 380px) {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        min-width: 0;
        border-radius: 8px;
    }
    & > *:after {
        content: ' ';
        grid-area: line;
        position: relative;
        display: block;
        border-bottom: 1px dashed #ccc;
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
        left: 8px;
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
        left: 3px;
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
        left: 4px;
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
    grid-template-columns: 30px 35px 2.5fr 70px 0.75fr;
    grid-template-areas: '. . . . . . .' 'line line line line line line line';
    /* min-height: 48px; */
    gap: 20px 7px;
    padding: 5px 10px;
    font-size: 1rem;
    & > span:not(:nth-child(3)) {
        justify-self: center;
        align-self: center;
    }
    & > span:last-child {
        justify-self: end;
        align-self: center;
    }

    @media (max-width: 400px) {
        display: grid;
        grid-template-columns: 25px 35px 3fr 25px 70px;

        /* min-height: 48px; */
        gap: 15px 5px;
        font-size: 0.7rem;
    }
`;

const CardTitle = styled.span`
    margin: 7px 15px;
    @media (max-width: 400px) {
        margin: 0;
        margin-right: 12px;
    }
`;
const PlusMinusWrapper = styled.div`
    align-self: center;
    justify-self: center;
    text-align: center;
    display: inherit;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0;
    margin-right: 10px;
    & > span {
        margin: 0 3px;
    }
    @media (max-width: 400px) {
        margin: 0;
    }
`;
const CardImage = styled.img`
    width: 34px;
    height: 34px;
    background-color: #eee;
    align-self: center;
`;

const CardView = ({ product, addToCart, removeFromCart, removeAllFromCart }) => {
    // add round to two digits function
    const total = Math.round((product.quantity * product.price + Number.EPSILON) * 100) / 100;

    return (
        <>
            <DeleteAllButton onClick={() => removeAllFromCart(product)}></DeleteAllButton>
            <CardImage src={product.image} />
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
export default function CartInner({ closeModal }) {
    console.log('remount inner');
    const shopContext = useShopContext();
    const [cartInner, setCartInner] = React.useState([]);
    const [cartView, setCartView] = React.useState();
    const [cartTotal, setCartTotal] = React.useState(0);

    useEffect(() => {
        setCartTotal(() => {
            return cartInner.reduce((acc, cur, i) => {
                return Math.round((acc + cur.quantity * cur.price + Number.EPSILON) * 100) / 100;
            }, 0);
        });
        try {
            setCartInner(shopContext.cart.products);
            const newCart = cartInner.map((product, i) => {
                return (
                    <ListItem key={nextId('product-list-item')}>
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
            setCartView(newCart);
            !shopContext.cart.products.length && closeModal();
        } catch (err) {
            console.error(err);
        }
    }, [shopContext, cartInner, closeModal]);

    return (
        <>
            <List>{cartView}</List>
            <div>Total: ${cartTotal}</div>
        </>
    );
}
