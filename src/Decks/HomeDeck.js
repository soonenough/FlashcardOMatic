import React, { useState, useEffect } from 'react';
import { listDecks } from '../utils/api';
import ViewButton from '../Home/ViewButton';
import StudyButton from '../Home/StudyButton';
import DeleteButton from '../Home/DeleteDeckButton';

function HomeDeck() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDecks = async () => {
      try {
        const allDecks = await listDecks(signal);
        setDecks(allDecks);
      } catch (error) {
        console.error('Error fetching deck data:', error);
      }
    };

    fetchDecks();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="row">
      {decks.map(deck => (
        <div className="col-sm-6" key={deck.id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
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
