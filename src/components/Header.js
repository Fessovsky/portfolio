import React from 'react';
import { useUriContext } from '../hooks/UriProvider';

export default function Header() {
    const uriContext = useUriContext();
    const linkNames = ['Home', 'Contacts', 'Projects', 'About'];

    function handleClick() {
        uriContext.setIsAnimated((prevState) => !prevState);
    }
    const classesForActiveLink = uriContext.isAnimated
        ? 'nav__list_link_active nav__list_link_active_animation'
        : 'nav__list_link_active';
    const linkList = linkNames.map((link, i) => {
        return (
            <li className="nav__list_item" key={i} onClick={() => uriContext.changeUri(link)}>
                {link === uriContext.uri ? <b className={classesForActiveLink}>/{link}/</b> : link}
            </li>
        );
    });

    return (
        <header className="nav__header">
            <nav className="nav__wrapper">{linkList}</nav>
            <button className="nav__header__button small" onClick={handleClick}>
                animate link
            </button>
        </header>
    );
}
