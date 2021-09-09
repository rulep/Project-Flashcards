import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { createCard, readDeck } from "../utils/api/index";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setDeck(deckInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          throw error;
        }
      }
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  function handleSubmit(card) {
    const abortController = new AbortController();

    async function callCreateCard() {
      try {
        await createCard(deckId, card, abortController.signal);
      } catch (err) {
        if (err.name === "AbortError") {
          console.info("aborted");
        } else {
          throw err;
        }
      }
    }
    callCreateCard();

    return () => {
      abortController.abort();
    };
  }
  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='bi bi-house-door-fill'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <CardForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </div>
  );
}

export default AddCard;
