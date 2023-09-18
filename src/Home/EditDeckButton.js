import React from "react";
import { Link } from "react-router-dom";
import { PencilFill } from "react-bootstrap-icons";
import { createDeck } from "../utils/api";

function EditButton({ deckId }) {

    return (
        <>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
                <PencilFill /> Edit
            </Link>
        </>
    );
}

export default EditButton;
