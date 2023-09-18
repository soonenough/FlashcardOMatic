import React from 'react';
import { createDeck } from "../utils/api";
import { PlusCircleFill } from 'react-bootstrap-icons';

function CreateDeckButton() {

    const buttonStyle = {
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px'
    };

    const iconStyle = {
        verticalAlign: 'middle',
    };

    return (
        <a href="/decks/new" className="btn btn-secondary" style={buttonStyle}>
            <PlusCircleFill style={iconStyle} /> Create Deck
        </a>
    );
}

export default CreateDeckButton;
