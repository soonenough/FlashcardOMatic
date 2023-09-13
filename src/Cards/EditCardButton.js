import React from "react";
import { Link } from "react-router-dom";
import { PencilFill } from "react-bootstrap-icons";

function EditCardButton({ deckId,cardId }) {
    return (
        <>
            <Link to={`/decks/${deckId}/cards/${cardId}/edit`} className="btn btn-secondary">
                <PencilFill /> Edit
            </Link>
        </>
    );
}

export default EditCardButton;


