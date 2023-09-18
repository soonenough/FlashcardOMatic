import React, { useEffect, useState } from "react";
import { listCards, readCard } from "../utils/api";
import { readDeck } from "../utils/api";
import { useParams, Link } from 'react-router-dom'; // Import useHistory
import { HouseFill } from 'react-bootstrap-icons';

function StudyCard() {
  const { deckId } = useParams();

  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState(null);
  const [cardId, setCardId] = useState(1);
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDeck = async () => {
      try {
        const deckData = await readDeck(deckId, signal);
        setDeck(deckData);
      } catch (error) {
        console.error('Error fetching deck data:', error);
      }
    };

    fetchDeck();

    return () => {
      controller.abort();
    };
  }, [deckId]);

  useEffect(() => {

    const fetchCards = async () => {
        try {
            const deckData = await readDeck(deckId);
            setDeck(deckData);
            setCards(deckData.cards);
        } catch (error) {
            console.error('Error fetching deck data:', error);
        }
    };

    if (deckId) {
        fetchCards();
    }
}, [deckId]);

  

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
  }, [cardId, deckId]);  // Run the effect whenever cardId or deckId changes

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardsArray = cards || [];

  const handleNext = () => {
    if (cardId === cards.length) {
      setCardId(1);
      setIsFlipped(false);
    } else {
      setCardId(cardId + 1);
      setIsFlipped(false);
      setCard(null);
    }
  };

  if (cardsArray.length > 2) {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><HouseFill /> Home</Link></li>
            {deck && <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>}
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-body">
            <div className="col">
              <div className="row">
                <div className="col-lg">
                  {card && (isFlipped ? card.back : card.front)}
                </div>
                <div className="col-sm-auto">
                  <h5>Card {cardId} of {cards.length}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-lg">
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
    )
  } else {
    return (
      <>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/"><HouseFill /> Home</Link></li>
              {deck && <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>}
              <li className="breadcrumb-item">Study</li>
            </ol>
          </nav>
        </div>
        <h1>Not Enough Cards</h1>
      </>

    );
  }
}

export default StudyCard;
