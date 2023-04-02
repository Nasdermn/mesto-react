import {useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import '../index.css';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

  useEffect(() => {
    function handleEscapeClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeClose);
      return () => {
        document.removeEventListener('keydown', handleEscapeClose);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then((res) => {
      //Отрисовка профиля
      setCurrentUser(res[0]);

      //Отрисовка карточек
      setCards(res[1]);
    })
    .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card.id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card.id);
    setCards(cards.filter(element => element._id != card.id));
  }

  function handleUpdateUser(userData) {
    api.patchProfile(userData.name, userData.about)
     .then(userData => {
      setCurrentUser(userData);
      closeAllPopups();
     })
     .catch(err => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    api.patchAvatar(userData.avatar)
     .then(userData => {
      setCurrentUser(userData);
      closeAllPopups();
     })
     .catch(err => console.log(err));
  }

  function handleAddCard(cardData) {
    api.postCard(cardData.name, cardData.link)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="body">
        <div className="page">
          <Header/>
          
          <Main
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onCardClick = {setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards = {cards}
          />

          <Footer/>

          <EditProfilePopup
            isOpen = {isEditProfilePopupOpen}
            onClose = {closeAllPopups}
            onUpdateUser={handleUpdateUser}
          >
          </EditProfilePopup>

          <EditAvatarPopup
            isOpen = {isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
            onUpdateAvatar = {handleUpdateAvatar}
          >
          </EditAvatarPopup>

          <AddPlacePopup
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            onAddCard={handleAddCard}
          >
          </AddPlacePopup>

          <ImagePopup
            card = {selectedCard}
            onClose={closeAllPopups}
          >
          </ImagePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;