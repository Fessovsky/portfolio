import React, { useEffect, useContext, useState } from 'react';

const UriContext = React.createContext('Home');
export const useUriContext = () => {
    return useContext(UriContext);
};
export const UriProvider = ({ children }) => {
    const [uri, setUri] = useState('Home');
    const [isAnimated, setIsAnimated] = useState(false);

    const changeCurrentPage = (link) => setUri(link);

    useEffect(() => {
        window.history.pushState(uri, uri, `/${uri}`);
    }, [uri]);
    return (
        <UriContext.Provider
            value={{
                uri: uri,
                changeUri: changeCurrentPage,
                isAnimated: isAnimated,
                setIsAnimated: setIsAnimated
            }}>
            {children}
        </UriContext.Provider>
    );
};
