import React, {useEffect, useState} from 'react';
import pencil from "../images/pencil.svg";
import plus from "../images/plus.png";
import api from '../utils/Api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then((res) => {
      //Отрисовка профиля
      setUserName(res[0].name)
      setUserDescription(res[0].about)
      setUserAvatar(res[0].avatar)
      const myId = res[0]._id;

      //Отрисовка карточек
      setCards(res[1].map((data) => ({
          cardId: data._id,
          name: data.name,
          link: data.link,
          likes: data.likes
      })))
    })
  }, []);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          <button className="profile__avatar" type="button" style={{ backgroundImage: `url(${userAvatar})` }} onClick={() => {onEditAvatar(true)}}>
            <img
              src={pencil}
              alt="Изменить фото"
              className="profile__photochanger"
            />
            <div className="profile__overlay" />
          </button>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" type="button" onClick={() => {onEditProfile(true)}}>
                <img
                  src={pencil}
                  alt="Кнопка «Изменить»"
                  className="profile__symbol profile__symbol_pencil"
                />
              </button>
            </div>
            <p className="profile__description">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={() => {onAddPlace(true)}}>
          <img
            src={plus}
            alt="Кнопка «Добавить»"
            className="profile__symbol profile__symbol_plus"
          />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card.cardId}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
