import React, { useEffect, useState } from "react";
import { readCard } from "../utils/api";
import { useParams } from 'react-router-dom';
import BreadCrumbNav from "../Layout/BreadCrumbNav";

function StudyCard() {
  const { deckId } = useParams();

  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]); // Assuming you have a cards state to store the array
  const [cardId, setCardId] = useState(1);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await readCard(cardId);
        setCard(response);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCard();
  }, [cardId, deckId]);  // Run the effect whenever deckId changes

  // Function to handle the flip button click
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCardId(cardId + 1);
    setIsFlipped(false); // Reset flip state for the next card
    setCard(null); // Reset card state to null for the new card
  };

  return (
    <div className="container">
      <BreadCrumbNav currentItem={cardId} />
      <div className="card">
        <div className="card-body">
          <div className="col">
            <div className="row">
              <div className="col-lg">
              {/* Display the front or back of the card based on flip state */}
              {card && (isFlipped ? card.back : card.front)}
              </div>
              <div className="col-sm-auto">
              <h5>{cardId} out of</h5>
            </div>
            </div>
            <div className="row">
              <div className="col-lg">
              {/* Button to flip the card */}
              <button type="button" className="btn btn-secondary" onClick={handleFlip}>
                Flip
              </button>
              </div>
              {isFlipped && (
                <button type="button" className="btn btn-primary mx-3" onClick={handleNext}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
