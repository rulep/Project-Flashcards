import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readCard, readDeck, updateCard } from "../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

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
    async function loadCard() {
      try {
        const cardInfo = await readCard(cardId, abortController.signal);
        setCard(cardInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          throw error;
        }
      }
    }

    loadDeck();
    loadCard();

    return () => abortController.abort();
  }, [deckId, cardId]);

  function handleSubmit(card) {
    const abortController = new AbortController();

    async function callUpdateCard() {
      try {
        await updateCard(card, abortController.signal);
        history.push(`/decks/${deckId}`);
      } catch (err) {
        if (err.name === "AbortError") {
          console.info("aborted");
        } else {
          throw err;
        }
      }
    }
    callUpdateCard();

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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        card={card}
      />
    </div>
  );
}

export default CreateDeck;
