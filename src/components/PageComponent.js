import React from 'react';
import { useUriContext } from '../hooks/UriProvider';
import Home from '../pages/Home';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import AnotherPage from '../pages/AnotherPage';

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
            case 'Another page':
                return <AnotherPage />;
            default:
                return <Home />;
        }
    };

    return <div className="pt-4">{renderPage(uriContext.uri)}</div>;
}
