import React, {useEffect, useState} from 'react';

function PopupWithForm({title, name, children, buttonText, isOpen, onClose}) {
  return (
  <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container">
      <button className="popup__cross" type="button" onClick={onClose}/>
      <p className="popup__title">{title}</p>
      <form className="popup__form" name={`${name}`} noValidate="">
        {children}
        <button type="submit" className="popup__button">
          {buttonText || 'Сохранить'}
        </button>
      </form>
    </div>
  </div>
  )
}

export default PopupWithForm;