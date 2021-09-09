import React from "react";
import CardDetails from "./CardDetails";

function CardList({ deck, deleteHandler }) {
  const rows = deck.cards?.map((card) =>
    CardDetails({ ...card, deckId: deck.id, deleteHandler })
  );

  return (
    <>
      <h2 className='mt-4'>Cards</h2>
      {rows}
    </>
  );
}

export default CardList;
