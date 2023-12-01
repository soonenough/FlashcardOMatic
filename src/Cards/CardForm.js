import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from 'react-router-dom';
import { HouseFill } from 'react-bootstrap-icons';
import { updateCard, createCard, readCard } from "../utils/api";
import { readDeck } from "../utils/api";

function CardForm() {
  const { cardId, deckId } = useParams();
  const history = useHistory();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [deck, setDeck] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [card, setCard] = useState(null);

  const goBack = () => {
    history.goBack();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const cardData = {
        front: front,
        back: back,
      };

      if (cardId) {
        cardData.id = cardId;
        cardData.deckId = parseInt(deckId);
        await updateCard(cardData);
      } else {
        await createCard(deckId, cardData);
      }

      setFront('');
      setBack('');
    } catch (error) {
      console.error('Error submitting card:', error);
    }
  };

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cardData = await readCard(cardId);
        setCard(cardData);
        setFront(cardData.front);
        setBack(cardData.back);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    if (cardId) {
      fetchCard();
    }
  }, [cardId]);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
        setName(deckData.name);
        setDescription(deckData.description);
      } catch (error) {
        console.error('Error fetching deck data:', error);
      }
    };

    if (deckId) {
      fetchDeck();
    }
  }, [deckId]);

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"><HouseFill /> Home</Link></li>
          <li className="breadcrumb-item">Decks</li>
          {deck && <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>}
          <li className="breadcrumb-item">{card ? "Edit Card" : 'Add Card'}</li>
        </ol>
      </nav>
      <div class="d-flex justify-content-center">
        <div className="col-sm">
          <h1>{card ? "Edit Card" : 'Add Card'}</h1>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea
              className="form-control"
              id="front"
              rows="3"
              placeholder="Front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
              className="form-control"
              id="back"
              rows="3"
              placeholder="Back"
              value={back}
              onChange={(e) => {
                console.log("change back", e.target.value);
                setBack(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="row">
            <div className="col-md-auto">
              <button type="button" className="btn btn-primary" onClick={goBack}>
                Done
              </button>
            </div>
            <div className="col-md-auto">
              <button type="submit" className="btn btn-secondary" onClick={submitHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CardForm;