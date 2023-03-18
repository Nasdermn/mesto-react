import React from 'react';

function Card(card, onCardClick) {
    function handleClick() {
        card.onCardClick(card);
    }

    return (
      <div className="card">
        <button className="card__remove" type="button" />
        <img className="card__picture" src={card.link} alt={card.name} onClick={handleClick}/>
        <div className="card__under-picture">
          <h2 className="card__text">{card.name}</h2>
          <div className="card__like-container">
            <button className="card__like" type="button" />
            <span className="card__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </div>
    )
}

export default Card;