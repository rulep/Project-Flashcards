import React from "react";
import { Link } from "react-router-dom";

function CardDetails({ id, front, back, deckId, deleteHandler }) {
  return (
    <div className='card my-1' key={id}>
      <div className='card-body'>
        <div className='card-content' style={{display:'flex'}}>
          <p className='card-text mx-2' style={{flex:1}}>{front}</p>
          <p className='card-text mx-2'style={{flex:1}}>{back}</p>
        </div>
        <div className='card-buttons'>
          <Link
            className='btn btn-secondary'
            to={`/decks/${deckId}/cards/${id}/edit`}
          >
            <i className='bi bi-pencil-fill'></i> Edit
          </Link>
          <button style={{display: 'flex',
  'justify-content': 'flex-end'}}
            className='btn btn-danger delete-deck'
            onClick={() => deleteHandler(id)}
          >
            <i className='bi bi-trash'></i> Delete
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
