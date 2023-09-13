import { EyeFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function ViewButton({ deckId }) {

    return (
        <>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                <EyeFill /> View
            </Link>
        </>
    );
}

export default ViewButton;
