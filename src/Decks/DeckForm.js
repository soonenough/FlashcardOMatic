import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { createDeck, updateDeck, readDeck } from "../utils/api"; // Import readDeck

function DeckForm() {
    const { deckId } = useParams(); 
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deck, setDeck] = useState(null);

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
  
    const goBack = () => {
        history.goBack();
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const deckData = {
                name: name,
                description: description,
            };

            if (deckId) {
                await updateDeck(deckId, deckData);
            } else {
                await createDeck(deckData);
            }

            history.push('/');
        } catch (error) {
            console.error('Error submitting deck:', error);
        }
    }

    if (!deck && deckId) {
        return <div>Loading...</div>;
    }

    return (
        <>

        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" 
                className="form-control" 
                id="name" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                className="form-control" 
                id="description" 
                rows="3" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="row">
                <div className="col-md-auto">
                    <button type="button" className="btn btn-primary" onClick={goBack}>Cancel</button>
                </div>
                <div className="col-md-auto">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </div>
            </div>
        </form>
    </>
    );
}

export default DeckForm;
