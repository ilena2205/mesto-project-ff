export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

 // @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image')
// @todo: Функция создания карточки
export function createCard(item, deleteCard, cardLikeToggle, openPopupImg) {
  const itemCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = itemCard.querySelector('.card__image');
  const deleteButton = itemCard.querySelector('.card__delete-button');
  const likeButton = itemCard.querySelector('.card__like-button');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  itemCard.querySelector('.card__title').textContent = item.name;
  deleteButton.addEventListener('click', () => deleteCard(itemCard));
  likeButton.addEventListener('click', () => cardLikeToggle(likeButton));
  cardImage.addEventListener('click', () => openPopupImg(imagePopup, item));
  return itemCard;
};

// @todo: Функция удаления карточки
export function deleteCard(card) {
    card.remove();
};

// Карточка лайкнута
export function cardLikeToggle(element) {
    element.classList.toggle('card__like-button_is-active');
};
