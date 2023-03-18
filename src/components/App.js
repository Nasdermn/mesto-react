import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import '../index.css';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  return (
  <div className="body">
    <div className="page">
      <Header/>
      <Main
        onEditProfile={setIsEditProfilePopupOpen}
        onAddPlace={setIsAddPlacePopupOpen}
        onEditAvatar={setIsEditAvatarPopupOpen}
        onCardClick = {setSelectedCard}
      />
      <Footer/>
      <PopupWithForm
        title = "Редактировать профиль"
        name = "edit"
        isOpen = {isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="name-input"
          type="text"
          className="popup__input popup__input_field_name"
          name="username"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required=""
        />
        <span className="input-error name-input-error" />
        <input
          id="description-input"
          type="text"
          className="popup__input popup__input_field_description"
          name="description"
          placeholder="Описание"
          minLength={2}
          maxLength={200}
          required=""
        />
        <span className="input-error description-input-error" />
      </PopupWithForm>
      <PopupWithForm
        title = "Новое место"
        name = "add"
        buttonText="Создать"
        isOpen = {isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
         <input
            id="place-input"
            type="text"
            className="popup__input popup__input_field_place"
            name="name"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
          />
          <span className="input-error place-input-error" />
          <input
            id="link-input"
            type="url"
            className="popup__input popup__input_field_link"
            name="link"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span className="input-error link-input-error" />
      </PopupWithForm>

      <PopupWithForm
        title = "Обновить аватар"
        name = "avatar"
        isOpen = {isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
            id="avatar-input"
            type="url"
            className="popup__input popup__input_field_avatar"
            name="avatar"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span className="input-error avatar-input-error" />
      </PopupWithForm>

      <PopupWithForm
        title = "Вы уверены?"
        name = "delete"
        buttonText="Да"
      >
      </PopupWithForm>

      <PopupWithImage
        card = {selectedCard}
        onClose={closeAllPopups}
      >
      </PopupWithImage>
    </div>
  </div>
  );
}

export default App;