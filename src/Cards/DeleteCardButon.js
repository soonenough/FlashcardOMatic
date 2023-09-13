import { useEffect, useState } from "react"
import { deleteCard } from "../utils/api";
import { Trash3Fill } from "react-bootstrap-icons";

function DeleteCardButton({ cardId}){
    const message = "Delete this deck? You will not be able to recover it."

    const [signal, setSignal] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setSignal(abortController.signal);

        return () => {
            abortController.abort();
        }
    }, []);

    const handleDeleteClick = async () => {
        if (window.confirm(message)) {
            try{
                await deleteCard(cardId, signal);

            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
                <button type="button" className="btn btn-danger" onClick={handleDeleteClick}>
                    <Trash3Fill />
                </button>
    )
}

export default DeleteCardButton;