import {handleErr, apiDeleteCard, likeCard, unlikeCard} from './api.js';
import {openPopupDef, closePopupDef, addClosePopupButtonListener, addClosePopupByOverlayListener, renderLoading} from './modal.js';
 // @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const deletePopup = document.querySelector('.popup_type_delete');
const deleteForm = deletePopup.querySelector('.popup__form');
// @todo: Функция создания карточки
export function createCard(item, userId, deleteSubmit, cardLikeToggle, openPopupImg) {
  const itemCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = itemCard.querySelector('.card__image');
  const deleteButton = itemCard.querySelector('.card__delete-button');
  const likeButton = itemCard.querySelector('.card__like-button');
  const likesCount = itemCard.querySelector('.likes__number');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likesCount.textContent = item.likes.length;
  itemCard.querySelector('.card__title').textContent = item.name;
  if (item.owner._id != userId) {
    deleteButton.style.display = 'none';
    deleteButton.disabled = 'true';
  } else {deleteButton.addEventListener('click', () => deleteSubmit(deletePopup, item._id, itemCard));}
  
  if (item.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  };
  
  likeButton.addEventListener('click', () => cardLikeToggle(likeButton, item._id, likesCount));
  cardImage.addEventListener('click', () => openPopupImg(item));
  return itemCard;
};

let cardToDeleteId, cardToDelete;

export function deleteSubmit(deletePopup, cardId, card) {
  openPopupDef(deletePopup);
  cardToDelete = card;
  cardToDeleteId = cardId;
}

// @todo: Функция удаления карточки
export function deleteCard(cardId, card) {
  apiDeleteCard(cardId)
    .then(() => {
    card.remove()})
    .catch(handleErr)
};

deleteForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCard(cardToDeleteId, cardToDelete);
  closePopupDef(deletePopup);
});

  // Карточка лайкнута
  export function cardLikeToggle(element, cardId, likesCountElement) {
    const likeMethod = element.classList.contains('card__like-button_is-active')?unlikeCard(cardId):likeCard(cardId);
    likeMethod.then(data => {
      element.classList.toggle('card__like-button_is-active');
      likesCountElement.textContent = data.likes.length;
    }) 
    .catch(handleErr)
  }
    
