import React from 'react';

export default function ChangeItemListButton({ onClickHandler, itemsArray }) {
    return (
        <button
            onClick={() => {
                onClickHandler(itemsArray);
            }}>
            Next
        </button>
    );
}
