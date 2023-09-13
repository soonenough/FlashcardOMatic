import { createCard } from "../utils/api";
import { PlusCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function AddCardsButton({ deckId }) {
  const handleCreateCard = () => {
    createCard(deckId);
  };

  const buttonStyle = {
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px'
  };

  const iconStyle = {
    verticalAlign: 'middle',
  };

  return (
    <Link to={`/decks/${deckId}/cards/new`} className="btn btn-secondary" onClick={handleCreateCard} style={buttonStyle}>
      <PlusCircleFill style={iconStyle} /> Create Card
    </Link>
  );
}

export default AddCardsButton;
