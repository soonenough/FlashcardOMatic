import StudyButton from "../Home/StudyButton";
import DeleteButton from "../Home/DeleteDeckButton";
import AddCardsButton from "../Home/AddCardsButton";
import EditButton from "../Home/EditDeckButton";
import EditCardButton from "../Cards/EditCardButton";
// import DeleteCardButton from "../Cards/DeleteCardButton";
import { listCards } from "../utils/api";
import FullCard from "../Cards/FullCard"
import BreadCrumbNav from "../Layout/BreadCrumbNav";
import { readDeck } from "../utils/api";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewedDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCards = async () => {
      try {

        const response = await listCards(signal, deckId);
        setCards(response.cards);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCards();

    return () => {
      controller.abort();
    };
  }, []);

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

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container">
    <div className="col">
    <BreadCrumbNav currentItem={deck.name} />
    <div className="container">
   

    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>
        <div className="row">
          <div className="col-md-auto">
            <EditButton deckId={deck.id} />
          </div>
          <div className="col-md-auto">
            <StudyButton deckId={deck.id} />
          </div>
          <div className="col col=lg-">
            <AddCardsButton deckId={deck.id} />
          </div>
          <div className="col-md-auto">
            <DeleteButton deckId={deck.id} />
          </div>
        </div>
      </div>
    </div>

    </div>
    <div className="container">
    {cards.map(card => (
        <div className="card" key={card.id}>
          <div className="card-body">
            <div className="row">
              <div className="col">
                {card.front}
              </div>
              <div className="col">
                {card.back}
              </div>
            </div>
            <div className="col">
              <div className="row justify-content-end">
                <div className="col-md-auto">
                  <EditCardButton cardId={card.id} deckId={card.deckId} />
                </div>
                <div className="col-md-auto">
                  <DeleteButton cardId={card.id} deckId={card.deckId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
</div>
  );
}

export default ViewedDeck;
