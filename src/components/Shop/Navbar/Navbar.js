import React from 'react';
import Cart from './Cart';
import styled from 'styled-components';
import './Navbar.css';

// .navbar__wrapper {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
// }
// .navbar__links {
//     display: flex;
//     flex-direction: row;
//     list-style: none;
//     gap: 5px;
// }
// .navbar__links__link > a {
//     color: black;
// }
// .navbar__logo {
//     font-weight: bold;
//     font-size: 2rem;
//     line-height: 69px;
//     letter-spacing: -0.24rem;
// }

const Logo = styled.div`
    font-weight: bold;
    font-size: 2rem;
    line-height: 69px;
    letter-spacing: -0.24rem;
    @media (max-width: 480px) {
        font-weight: bold;
        font-size: 1.4rem;
        line-height: 19px;
        letter-spacing: -0.24rem;
    }
`;

export default function Navbar() {
    return (
        <nav className="navbar__wrapper">
            <Logo>MOCKUP LOGO</Logo>
            <ul className="navbar__links">
                <li className="navbar__links__link">
                    <a href="#1">First</a>
                </li>
                <li className="navbar__links__link">
                    <a href="#2">Second</a>
                </li>
                <li className="navbar__links__link">
                    <a href="#3">Third</a>
                </li>
                <Cart />
            </ul>
        </nav>
    );
}
