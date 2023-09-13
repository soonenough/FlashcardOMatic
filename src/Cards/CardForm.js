import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, createCard, readCard } from "../utils/api";
import { createDeck, updateDeck, readDeck } from "../utils/api"; // Import readDeck
import BreadCrumbNav from "../Layout/BreadCrumbNav";

function CardForm() {
  const { cardId, deckId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState('')
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [deck, setDeck] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
        await updateCard(cardId, cardData);
      } else {
        await createCard(deckId, cardData);
      }

      history.push('/');
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
            console.error('Error fetching deck data:', error);
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

  return (
    <>
           <BreadCrumbNav currentItem={deck ? "Edit Deck" : 'New Deck'}/>
            <h1>Edit Card</h1>
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
              onChange={(e) => setBack(e.target.value)}
            ></textarea>
          </div>
          <div className="row">
            <div className="col-md-auto">
              <button type="button" className="btn btn-primary" onClick={goBack}>
                Cancel
              </button>
            </div>
            <div className="col-md-auto">
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CardForm;