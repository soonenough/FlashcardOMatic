import { Trash3Fill } from "react-bootstrap-icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeleteButton({ deckId }) {

    const history = useHistory();

    const message = "Delete this deck? You will not be able to recover it."

    const handleDeleteClick = async () => {
        if (window.confirm(message)) {
            try {
                //delete the deck from state
                await deleteDeck(deckId);
                history.push("/");
                window.location.reload();

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
