import React from 'react';
import Cart from './Cart';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar__wrapper">
            <div className="navbar__logo">Logo</div>
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
                <li className="navbar__links__link">
                    <a href="#4">Fourth</a>
                </li>
                <Cart quantity="10" />
            </ul>
        </nav>
    );
}
