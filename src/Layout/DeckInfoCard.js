import React from "react";
import { Link } from "react-router-dom";

function DeckInfoCard({ name, description, id, cards, handleDeleteDeck }) {
  return (
    <div className='card my-1' key={id}>
      <div className='card-body'>
        <div className='deck-card-header' style={{
  display: 'flex',
  width: '100%',
  'justifyContent': 'space-between'
}
}>
          <h5 className='card-title'>{name}</h5>
          <p className='card-subtitle text-muted'>{cards.length} cards</p>
        </div>
        <p className='card-text'>{description}</p>
        <div className='deck-card-buttons'>
          <Link className='btn btn-secondary' to={`/decks/${id}`}>
            <i className='bi bi-eye-fill'></i> View
          </Link>
          <Link className='btn btn-primary' to={`/decks/${id}/study`}>
            <i className='bi bi-book'></i> Study
          </Link>
          <button
            className='btn btn-danger delete-deck'
            onClick={() => handleDeleteDeck(id)}
          >
            <i className='bi bi-trash'></i>Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckInfoCard;
