import React from 'react';
export function addCustomNameOfComponentToField(arr, propName) {
    return arr.map((component) => {
        component[propName] = component.customName;
        component = React.createElement(component);
        return component;
    });
}
