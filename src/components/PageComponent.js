import React from 'react';
import { useUriContext } from '../hooks/UriProvider';
import Home from '../pages/Home';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import RogulikeBase from '../pages/RogulikeBase';

export default function PageComponent() {
    const uriContext = useUriContext();
    const renderPage = (uri) => {
        switch (uri) {
            case 'Home':
                return <Home />;
            case 'Contacts':
                return <Contacts />;
            case 'About':
                return <About />;
            case 'RoguelikeBase':
                return <RogulikeBase />;
            default:
                return <Home />;
        }
    };

    return <div className="pt-4">{renderPage(uriContext.uri)}</div>;
}
