import React, { useState } from 'react';

export default function ChangeItemListButton({ onClickHandler, itemsArray }) {
    const [isShown, setIsShown] = useState(false);
    const ItemList = () => {
        const list = itemsArray.map((item, i) => {
            return (
                <li
                    onClick={() => {
                        onClickHandler(item);
                    }}
                    key={item + '-' + i}>
                    {item}
                </li>
            );
        });
        return <ul>{list}</ul>;
    };
    const handleClick = () => {
        setIsShown((prevState) => !prevState);
    };
    return (
        <>
            <button className="btn btn-primary" onClick={handleClick}>
                {isShown ? 'Hide' : 'Choose project'}
            </button>
            {isShown && <ItemList />}
        </>
    );
}
