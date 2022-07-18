import React from 'react';
import { useUriContext } from '../hooks/UriProvider';
import { pages as routes } from '../router/routeComponents';

export default function PageComponent() {
    const uriContext = useUriContext();
    const renderPage = (uri) => {
        return routes.map((route, i) => {
            // take function names to return Component
            return route.type.name === uri && { ...route, key: i };
        });
    };

    return <div className="pt-4">{renderPage(uriContext.uri)}</div>;
}
