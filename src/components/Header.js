import React from 'react';
import { useUriContext } from '../hooks/UriProvider';

export default function Header() {
    const uriContext = useUriContext();
    const linkNames = ['Home', 'Contacts', 'Another page', 'About'];
    const linkList = linkNames.map((link, i) => {
        return (
            <li className="nav__list_item" key={i} onClick={() => uriContext.changeUri(link)}>
                {link === uriContext.uri ? <b>/{link}/</b> : link}
            </li>
        );
    });

    return (
        <header className="nav__header">
            <nav className="nav__wrapper">{linkList}</nav>
        </header>
    );
}
