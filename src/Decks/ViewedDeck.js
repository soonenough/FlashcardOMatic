import StudyButton from "../Home/StudyButton";
import DeleteButton from "../Home/DeleteDeckButton";
import AddCardsButton from "../Home/AddCardsButton";
import EditButton from "../Home/EditDeckButton";
import FullCard from "../Cards/FullCard"
import BreadCrumbNav from "../Layout/BreadCrumbNav";
import { listCards, readDeck } from "../utils/api";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewedDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState();

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
    <FullCard />
    </div>
    </div>
</div>
  );
}

export default ViewedDeck;
