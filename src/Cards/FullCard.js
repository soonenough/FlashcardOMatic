import React, { useState, useEffect } from 'react';
import EditCardButton from './EditCardButton';
import DeleteCardButton from './DeleteCardButon';
import { listCards } from '../utils/api';
import { useParams } from 'react-router-dom';


function FullCard() {
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();

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

  return (
    <>
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
