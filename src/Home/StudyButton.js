import { Book } from "react-bootstrap-icons";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function StudyButton({ deckId }){
    return(
        <>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
        <Book /> Study
        </Link>
        </>
    )
}



export default StudyButton;