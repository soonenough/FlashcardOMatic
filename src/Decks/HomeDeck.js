import React, { useState, useEffect } from 'react';
import { listDecks } from '../utils/api';
import ViewButton from '../Home/ViewButton';
import StudyButton from '../Home/StudyButton';
import DeleteButton from '../Home/DeleteDeckButton';

function HomeDeck() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDecksAndCards = async () => {
      try {
        const allDecks = await listDecks(signal);
        setDecks(allDecks);

        const allCards = allDecks.flatMap(deck => deck.cards);
        setCards(allCards);
      } catch (error) {
        console.error('Error fetching deck data:', error);
      }
    };

    fetchDecksAndCards();

    return () => {
      controller.abort();
    };
  }, [decks]);

  return (
    <div className="row">
      {decks.map(deck => (
        <div className="col-sm-6" key={deck.id}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg">
                  <h5 className="card-title">{deck.name}</h5>
                </div>
                <div className="col-sm-auto">
                  <h5>{cards.filter(card => card.deckId === deck.id).length} cards</h5>
                </div>
              </div>
              <p className="card-text">{deck.description}</p>
              <div className="row">
                <div className="col-md-auto">
                    <ViewButton deckId={deck.id} />
                  </div>
                  <div className="col col=lg-2">
                    <StudyButton deckId={deck.id} />
                  </div>
                  <div className="col col-lg-2">
                    <DeleteButton deckId={deck.id} />
                  </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeDeck;
