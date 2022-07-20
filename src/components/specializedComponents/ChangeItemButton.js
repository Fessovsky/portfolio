import React, { useState } from 'react';
import Slider from './Slider/Slider';

export default function ChangeItemListButton({ onClickHandler, itemsArray }) {
    const [isShown, setIsShown] = useState(false);
    const ItemList = () => {
        const list = itemsArray.map((item, i) => {
            return (
                <li
                    className="projects__list__item"
                    onClick={() => {
                        onClickHandler(item);
                    }}
                    key={item + '-' + i}>
                    <span className="projects__list__item-span">{item}</span>
                </li>
            );
        });
        return <ul className="projects__list">{list}</ul>;
    };
    const handleClick = () => {
        setIsShown((prevState) => !prevState);
    };
    return (
        <>
            <button className="btn btn-primary" onClick={handleClick}>
                {isShown ? 'Hide projects' : 'Show projects'}
            </button>
            {isShown && (
                <Slider>
                    <ItemList />
                </Slider>
            )}
        </>
    );
}
