import React, { useState, useEffect } from 'react';
import EditCardButton from './EditCardButton';
import DeleteCardButton from './DeleteCardButon';
import { readDeck, listCards } from '../utils/api';
import { useParams } from 'react-router-dom';


function FullCard() {
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setCards(response.cards);
      } catch (error) {
        console.error('Error fetching deck data:', error);
      }
    };
  
    fetchDeck();
  
    return () => {
      controller.abort();
    };
  }, [cards]);

  return (
    <>
      {cards.map((card) => ( 
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
                  <DeleteCardButton cardId={card.id} deckId={card.deckId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default FullCard;
