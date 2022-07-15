import React, { useState } from 'react';

export default function Contact() {
    const [placeholders, setPlaceholders] = useState({ telegram: '', email: '' });
    const [contact, setContack] = useState({ telegram: '@fessovsky', email: 'isaev.dmi3@gmail.com' });
    function handleClick(target) {
        setPlaceholders((prevState) => {
            return { ...prevState, [target.dataset.name]: contact[target.dataset.name] };
        });
    }
    return (
        <div className="contacts__contact_container">
            <h1>Contacts</h1>
            <div className="contacts__contact__container_item">
                Telegram:{' '}
                {placeholders.telegram || (
                    <span
                        onClick={(e) => handleClick(e.target)}
                        data-name="telegram"
                        className="contact__link">
                        show
                    </span>
                )}
            </div>
            <div className="contacts__contact__container_item">
                Email:{' '}
                {placeholders.email || (
                    <span onClick={(e) => handleClick(e.target)} data-name="email" className="contact__link">
                        show
                    </span>
                )}
            </div>
        </div>
    );
}
