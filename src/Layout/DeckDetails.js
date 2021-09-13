import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import NotFound from "./NotFound";
import CardList from "./CardList";

function DeckDetails() {
  const [deckInfo, setDeckInfo] = useState({});
  const { deckId } = useParams();
  const { name, description } = deckInfo;
  const { url } = useRouteMatch();
  const history = useHistory();

  async function getDeckDetails() {
    try {
      const deck = await readDeck(deckId);
      setDeckInfo(deck);
    } catch (error) {
      setDeckInfo({ name: "Not Found" });
    }
  }
  useEffect(() => {
    getDeckDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  async function deleteHandler(id) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(id);
      getDeckDetails();
    }
  }

  //Handle incorrect deckId
  if (name === "Not Found") return <NotFound />;

  async function handleDeleteDeck() {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(deckId);
      history.push("/");
    }
  }

  //TODO: Skeleton animation
  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='bi bi-house-door-fill'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {name}
          </li>
        </ol>
      </nav>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className='deck-card-buttons'>
        <Link className='btn btn-secondary' to={`${url}/edit`}>
          <i className='bi bi-pencil-fill'></i> Edit
        </Link>
        <Link className='btn btn-primary' to={`${url}/study`}>
          <i className='bi bi-book'></i> Study
        </Link>
        <Link className='btn btn-primary' to={`${url}/cards/new`}>
          <i className='bi bi-plus-lg'></i> Add Cards
        </Link>
        <button
          className='btn btn-danger delete-deck'
          onClick={handleDeleteDeck}
        >
          <i className='bi bi-trash'></i> Delete
        </button>
      </div>

      <CardList deck={deckInfo} deleteHandler={deleteHandler} />
    </div>
  );
}

export default DeckDetails;
