import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FlashCard from "./FlashCard";
import { readDeck } from "../utils/api/index";
import NotEnoughCards from "./NotEnoughCards";

function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [cardId, setCardId] = useState(0);

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

  function handleNext() {
    //TODO: handle clicking next
    if (cardId >= deck.cards.length - 1) {
      if (window.confirm("Restart cards?")) {
        setCardId(0);
      } else {
        history.push("/");
      }
    } else {
      setCardId(cardId + 1);
    }
  }

  const flashCards =
    deck?.cards?.length > 2 ? (
      <FlashCard handleNext={handleNext} deck={deck} cardId={cardId} />
    ) : (
      <NotEnoughCards deck={deck} />
    );

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
            Study
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Study</h1>
      {flashCards}
    </div>
  );
}

export default StudyDeck;
