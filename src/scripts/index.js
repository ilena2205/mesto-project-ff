import '../pages/index.css';

import {initialCards, createCard, deleteCard, cardLikeToggle} from './cards.js';
import {openPopupImg, openPopupDef, closePopupDef, closePopup, closeOverlayPopup, closeEscPopup} from './modal.js';
 // @todo: DOM узлы
 const placesList = document.querySelector('.places__list');

 // переменные для открытия модальных окон
const allPopup = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCard = document.querySelector('.popup_type_new-card');

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const cardElement = createCard(item, deleteCard, cardLikeToggle, openPopupImg);
    placesList.append(cardElement); 
});

//функции для открытия конкретных окон
editButton.addEventListener('click', () => {
    openPopupDef(editPopup);
});
addButton.addEventListener('click', () => {
    openPopupDef(newCard);
});

//функции для закрытия конкретных окон
allPopup.forEach(closeOverlayPopup);
allPopup.forEach(closePopup);  
allPopup.forEach(closeEscPopup);

// Находим форму в DOM
const formElement = editPopup.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
const nameValue = nameInput.value;
const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
profileTitle.textContent = nameValue;
profileDescription.textContent = jobValue;
formElement.reset();
closePopupDef(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 




// Находим форму в DOM
const formCard = newCard.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
const cardNameInput = formCard.querySelector('.popup__input_type_card-name');// Воспользуйтесь инструментом .querySelector()
const urlInput = formCard.querySelector('.popup__input_type_url');// Воспользуйтесь инструментом .querySelector()
function cardFormSubmit(evt) {
    evt.preventDefault(); 
    const cardNameValue = cardNameInput.value;
    const urlValue = urlInput.value;
    const cardValue = [];
    cardValue.name = cardNameValue;
    cardValue.link = urlValue;
    initialCards.unshift(cardValue);

    formCard.reset();
    closePopupDef(newCard);

    function cardCreate(item) {
        const cardElement = createCard(item, deleteCard, cardLikeToggle, openPopupImg);
        placesList.prepend(cardElement); 
    };

    cardCreate(initialCards[0]);
}
formCard.addEventListener('submit', cardFormSubmit); 