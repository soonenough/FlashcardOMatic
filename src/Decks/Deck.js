
import React, { useState, useEffect } from 'react';
import { readDeck, listDecks } from '../utils/api'; // Assuming you have an API function to list all decks
import ViewButton from '../Home/ViewButton';
import StudyButton from '../Home/StudyButton';
import DeleteButton from '../Home/TrashButton';

function Deck() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDeckData = async (id) => {
      try {
        const deckData = await readDeck(id);
        setDecks(prevDecks => [...prevDecks, deckData]);
      } catch (error) {
        console.error('Error fetching deck data:', error);
      }
    };

    const fetchDataForAllDecks = async () => {
      try {
        const deckIds = await listDecks(); // Assuming listDecks() returns an array of deck IDs
        deckIds.forEach(id => fetchDeckData(id));
      } catch (error) {
        console.error('Error fetching deck IDs:', error);
      }
    };

    fetchDataForAllDecks();

    return () => {
      // Cleanup if needed
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
                <div className="col col-lg-2">
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

export default Deck;
