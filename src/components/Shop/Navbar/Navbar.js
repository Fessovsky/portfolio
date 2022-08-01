import React from 'react';
import Cart from './Cart';
import styled from 'styled-components';
import './Navbar.css';

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
                    <a href="#1">link 1</a>
                </li>
                <li className="navbar__links__link">
                    <a href="#2">link2</a>
                </li>

                <Cart />
            </ul>
        </nav>
    );
}
