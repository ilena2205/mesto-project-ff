// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
    const itemCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = itemCard.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    itemCard.querySelector('.card__title').textContent = item.name;
    const deleteButton = itemCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(itemCard));
    return itemCard;
};

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const cardElement = createCard(item, deleteCard);
    placesList.append(cardElement); 
});