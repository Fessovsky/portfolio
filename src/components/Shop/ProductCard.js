import React from 'react';
import styled from 'styled-components';
import Slider from '../../components/specializedComponents/Slider/Slider';
import { useShopContext } from '../../hooks/ShopProvider';


const FlexWrapperRow = styled.div`
    display: flex;
    flex-direction: row;
`;
const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 260px 0 4rem 2rem 3rem 7rem 56px;
    justify-items: center;
    max-width: 280px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    min-height: 560px;
    * {
        margin: 7px;
    }
`;
const CardImageWrapper = styled.div`
    display: inline-block;
    background: url(${(image) => image.image});
    background-size: 100% auto;
    background-repeat: no-repeat;
    width: 80%;
    height: 250px;
`;

const CardTitle = styled.h5`
    font-size: 0.9rem;
`;

const CardDescComponent = ({ children, className, onScroll }) => {
    const [hasScroll, setHasScroll] = React.useState(false);
    const refer = React.useRef();
    React.useEffect(() => {
        if (refer.current.scrollHeight > refer.current.clientHeight) {
            setHasScroll(true);
        }
    }, []);
    return (
        <p
            ref={refer}
            onScroll={(e) => {
                onScroll(e);
            }}
            className={hasScroll ? className + ' slider__mask' : className}>
            {children}
        </p>
    );
};
const CardDesc = styled(CardDescComponent)`
    font-size: 0.8rem;
    &:before {
        content: '';
        width: 100%;
        height: 100%;
        position: relative;
        left: 0;
        top: 0;
        background: linear-gradient(transparent 150px, white);
    }
`;
const MyButton = ({ className, handleClick, children }) => {
    return (
        <button onClick={() => handleClick()} className={'yo' + className}>
            {children}
        </button>
    );
};
const CardButton = styled(MyButton)``;
const CardTop = styled.h6`
    font-size: 0.8rem;
    color: #666;
`;

const UlStyling = styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(275px, 280px));
    grid-gap: 15px;
    justify-content: center;
`;
const UlWrapper = styled.div`
    justify-content: center;
`;
const CardPrice = styled.div`
    font-size: 1.3rem;
    font-weight: bold;
    align-self: end;
`;
const CardBestPrice = styled.div`
    color: red;
    position: relative;
    bottom: 250px;
    left: 110px;
    transform: rotate(45deg);
`;
function Card(props) {
    // description length 200
    // title length 55
    const shopContext = useShopContext();
    return (
        <CardWrapper>
            <CardImageWrapper image={props.image}></CardImageWrapper>
            <FlexWrapperRow>{props.hit && <CardBestPrice>Best Price</CardBestPrice>}</FlexWrapperRow>
            <CardPrice>${props.price}</CardPrice>
            <CardTop>{props.category}</CardTop>
            <CardTitle>{props.title}</CardTitle>

            <Slider isOnlyY={true}>
                <CardDesc>{props.description}</CardDesc>
            </Slider>
            <CardButton
                handleClick={() => {
                    shopContext.handleAddToCart(props);
                }}
                className="btn">
                Add to cart
            </CardButton>
            <CardButton
                handleClick={() => {
                    shopContext.handleRemoveFromCart(props);
                }}
                className="btn">
                Delete from cart
            </CardButton>
        </CardWrapper>
    );
}

export default function ProductCard({ products, hits }) {
    if (products === null) {
        return <h4>No products</h4>;
    }
    const productList = products.map((item) => {
        let hit = !!hits.filter((hit) => item.id === +hit)[0];
        return <Card key={item.id} {...item} hit={hit} />;
    });
    return (
        <UlWrapper>
            <UlStyling>{productList}</UlStyling>
        </UlWrapper>
    );
}
