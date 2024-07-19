import '../pages/index.css';

import {createCard, deleteCard, cardLikeToggle, deleteSubmit} from './card.js';
import {openPopupDef, closePopupDef, addClosePopupButtonListener, addClosePopupByOverlayListener, renderLoading} from './modal.js';
import {enableValidation, resetFormValidation, resetButtonState} from './validation.js';
import {getInitialCards, getUserData, updateUser, handleErr, addNewCard, avatarUser} from './api.js';
// @todo: DOM узлы
 const placesList = document.querySelector('.places__list');
 // переменные для открытия модальных окон
const allPopup = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__image');
const editPopup = document.querySelector('.popup_type_edit');
const popupwithImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const newCard = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');

// Находим форму в DOM
const editFormElement = editPopup.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
const nameInput = editFormElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = editFormElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
const saveButtonEdit = editFormElement.querySelector('.popup__button');
// Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilePicture = document.querySelector('.profile__image');

const formCard = newCard.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
const cardNameInput = formCard.querySelector('.popup__input_type_card-name');// Воспользуйтесь инструментом .querySelector()
const urlInput = formCard.querySelector('.popup__input_type_url');// Воспользуйтесь инструментом .querySelector()
const saveButtonCard = formCard.querySelector('.popup__button');

const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarLinkInput = avatarForm.querySelector('.popup__input_type_avatar');
const saveButtonAvatar = avatarForm.querySelector('.popup__button');

Promise.all([getUserData(), getInitialCards()
]).then(([userData, cardData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profilePicture.style.backgroundImage = `url(${userData.avatar})`;
    const userId = userData._id;
    // @todo: Вывести карточки на страницу
    cardData.forEach(function(item) {
        const cardElement = createCard(item, userId, deleteSubmit, cardLikeToggle, openPopupImg);
        placesList.append(cardElement); 
    });
  })
  .catch(handleErr);

//функция вызова попапа картинки
function openPopupImg(item) {
    openPopupDef(popupwithImage);
    popupImage.src = item.link;
    popupImage.alt = item.name;
    const popupTitle = document.querySelector('.popup__caption');
    popupTitle.textContent = item.name;
}

//функции для открытия конкретных окон
editButton.addEventListener('click', () => {
    openPopupDef(editPopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    resetFormValidation(editPopup, validConfiguration);
});

addButton.addEventListener('click', () => {
    openPopupDef(newCard);
    cardNameInput.value = "";
    urlInput.value = "";
    resetFormValidation(newCard, validConfiguration);
});

avatarButton.addEventListener('click', () => {
    openPopupDef(avatarPopup);
    avatarLinkInput.value = profilePicture.style.backgroundImage.slice(5, -2);
    resetFormValidation(avatarPopup, validConfiguration);
});

//функции для закрытия конкретных окон
allPopup.forEach(popup => {
    addClosePopupButtonListener(popup);
    addClosePopupByOverlayListener(popup)
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editFormSubmit(evt) {
    evt.preventDefault(); 
    renderLoading(true, saveButtonEdit);
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    editFormElement.reset();
    updateUser(nameValue, jobValue).then((userData) => {
         // Вставьте новые значения с помощью textContent
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closePopupDef(editPopup);
    })
        .catch(handleErr)
        .finally(() => {
        renderLoading(false, saveButtonEdit);
    });
}
editFormElement.addEventListener('submit', editFormSubmit); 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function avatarFormSubmit(evt) {
    evt.preventDefault(); 
    renderLoading(true, saveButtonAvatar);
    const avatarUrl = avatarLinkInput.value;
    avatarUser(avatarUrl).then((userData) => {
        profilePicture.style.backgroundImage = `url(${userData.avatar})`;
        avatarForm.reset();
        closePopupDef(avatarPopup);
    })
    .catch(handleErr)
    .finally(() => {
        renderLoading(false, saveButtonAvatar);
    });
}
avatarForm.addEventListener('submit', avatarFormSubmit); 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function cardFormSubmit(evt) {
    evt.preventDefault(); 
    renderLoading(true, saveButtonCard);
    const cardNameValue = cardNameInput.value;
    const urlValue = urlInput.value;
    function addCard(cardData) {
        const cardElement = createCard(cardData, cardData.owner._id, deleteSubmit, cardLikeToggle, openPopupImg);
        placesList.prepend(cardElement); 
    };

    addNewCard(cardNameValue, urlValue).then(cardData => {
    // Добавляем новую карточку на страницу
        addCard(cardData);
        formCard.reset();
        closePopupDef(newCard);
    })
    .catch(handleErr)
    .finally(() => {
        renderLoading(false, saveButtonCard);
    });
}
formCard.addEventListener('submit', cardFormSubmit); 


export const validConfiguration = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });

enableValidation(validConfiguration);


