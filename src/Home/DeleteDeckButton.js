import { Trash3Fill } from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";
import { deleteDeck } from "../utils/api";

function DeleteButton({ deckId }) {

    const message = "Delete this deck? You will not be able to recover it."

    const [signal, setSignal] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setSignal(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, []);

    const handleDeleteClick = async () => {
        if (window.confirm(message)) {
            try {
                //delete the deck from state
                await deleteDeck(deckId, signal);
                
            } catch (error) {
                console.error(error);
                window.location.reload();
            }
        }
    }

    return (
        <button type="button" className="btn btn-danger mx-3" onClick={handleDeleteClick}>
            <Trash3Fill />
        </button>
    );
}

export default DeleteButton;
