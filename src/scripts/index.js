import '../pages/index.css';

import {initialCards} from './cards.js';
import {createCard, deleteCard, cardLikeToggle} from './card.js';
import {openPopupDef, closePopupDef, addClosePopupButtonListener, addClosePopupByOverlayListener, addCloseEscListener} from './modal.js';

// @todo: DOM узлы
 const placesList = document.querySelector('.places__list');
 // переменные для открытия модальных окон
const allPopup = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const popupwithImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const newCard = document.querySelector('.popup_type_new-card');
// Находим форму в DOM
const editFormElement = editPopup.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = editFormElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = editFormElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
// Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//функция вызова попапа картинки
function openPopupImg(item) {
    openPopupDef(popupwithImage);
    popupImage.src = item.link;
    popupImage.alt = item.name;
    const popupTitle = document.querySelector('.popup__caption');
    popupTitle.textContent = item.name;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const cardElement = createCard(item, deleteCard, cardLikeToggle, openPopupImg);
    placesList.append(cardElement); 
});

//функции для открытия конкретных окон
editButton.addEventListener('click', () => {
    openPopupDef(editPopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

addButton.addEventListener('click', () => {
    openPopupDef(newCard);
});

//функции для закрытия конкретных окон

allPopup.forEach(popup => {
    addClosePopupButtonListener(popup);
    addClosePopupByOverlayListener(popup)
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
const nameValue = nameInput.value;
const jobValue = jobInput.value;
    // Вставьте новые значения с помощью textContent
profileTitle.textContent = nameValue;
profileDescription.textContent = jobValue;
editFormElement.reset();
closePopupDef(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', editFormSubmit); 




// Находим форму в DOM
const formCard = newCard.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
const cardNameInput = formCard.querySelector('.popup__input_type_card-name');// Воспользуйтесь инструментом .querySelector()
const urlInput = formCard.querySelector('.popup__input_type_url');// Воспользуйтесь инструментом .querySelector()
function cardFormSubmit(evt) {
    evt.preventDefault(); 
    const cardNameValue = cardNameInput.value;
    const urlValue = urlInput.value;
    const cardValue = {
        name: cardNameValue,
        link: urlValue,
     };

    formCard.reset();
    closePopupDef(newCard);

    function addCard(item) {
        const cardElement = createCard(item, deleteCard, cardLikeToggle, openPopupImg);
        placesList.prepend(cardElement); 
    };
console.log(cardValue);
    addCard(cardValue);
}
formCard.addEventListener('submit', cardFormSubmit); 