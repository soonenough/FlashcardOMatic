import React from "react";
import { Link } from "react-router-dom";
import { PencilFill } from "react-bootstrap-icons";
import { createDeck } from "../utils/api";

function EditButton({ deckId }) {
    const handleCreateDeck = () => {
        createDeck();
    };

    return (
        <>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary" onClick={handleCreateDeck}>
                <PencilFill /> Edit
            </Link>
        </>
    );
}

export default EditButton;
