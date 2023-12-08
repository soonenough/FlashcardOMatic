import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from 'react-router-dom'; // Import useHistory
import { HouseFill } from 'react-bootstrap-icons';
import { createDeck, updateDeck, readDeck } from "../utils/api"; // Import readDeck

function DeckForm({ signal }) {
    const { deckId } = useParams();
    console.log("Deck ID:", deckId);
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                console.log('Fetching deck with ID:', deckId);
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
                await updateDeck(deckId, deckData, signal);
            } else {
                await createDeck(deckData);
            }
    
            history.push("/");
        } catch (error) {
            console.error('Error submitting deck:', error);
        }
    }

    if (!deck && deckId) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><HouseFill /> Home</Link></li>
                    {deck && <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>}
                    <li className="breadcrumb-item">{deck ? "Edit Deck" : 'Create Deck'}</li>
                </ol>
            </nav>
            <h1>{deck ? "Edit Deck" : 'Create Deck'}</h1>
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
