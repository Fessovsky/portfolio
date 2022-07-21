import React from 'react';
import styled from 'styled-components';
import Slider from '../../components/specializedComponents/Slider/Slider';
// import './ProductCard.css';

// const a = {
//     id: 1,
//     title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
//     price: 109.95,
//     description:
//         'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//     category: "men's clothing",
//     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//     rating: {
//         rate: 3.9,
//         count: 120
//     }
// };
const FlexWrapperRow = styled.div`
    display: flex;
    flex-direction: row;
`;
const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 250px 3rem 60px 120px 50px;
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
    /* display: table-cell; */

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
const CardDesc = styled.p`
    font-size: 0.8rem;
`;
const MyButton = ({ className, children }) => {
    return <button className={className}>{children}</button>;
};
const CardButton = styled(MyButton)``;
const CardTop = styled.h6`
    font-size: 0.8rem;
    color: #666;
`;

const UlStyling = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0;
    padding: 0;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
`;
function Card(props) {
    // description length 200
    // title length 55
    return (
        <CardWrapper>
            <CardImageWrapper image={props.image}></CardImageWrapper>
            <FlexWrapperRow>
                <CardTop>{props.category}</CardTop>
                <CardTop>Hit</CardTop>
            </FlexWrapperRow>
            <CardTitle>{props.title}</CardTitle>

            <Slider isOnlyY={true}>
                <CardDesc>{props.description}</CardDesc>
            </Slider>

            <CardButton className="btn">Add to cart</CardButton>
        </CardWrapper>
    );
}

export default function ProductCard({ products, hits }) {
    if (products === null) {
        return <h4>No products</h4>;
    }
    const productList = products.map((item) => {
        // let hit = !!hits.filter((hit) => item.id === +hit)[0];
        return <Card {...item} />;
    });
    return <UlStyling>{productList}</UlStyling>;
}
