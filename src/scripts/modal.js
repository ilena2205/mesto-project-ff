//функция вызова попапа картинки
export function openPopupImg(element, item) {
    element.classList.add('popup_is-opened');
    element.classList.add('popup_is-animated');
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = item.link;
    popupImage.alt = item.name;
    const popupTitle = document.querySelector('.popup__caption');
    popupTitle.textContent = item.name;
}

//базовые функции открытия и закрытия (для функций кликеров дальше)
export function openPopupDef(element) {
    element.classList.add('popup_is-opened');
    element.classList.add('popup_is-animated');
}

export function closePopupDef(element) {
    element.classList.remove('popup_is-opened');
}

//функции для закрытия окон через крестик, esc и фон (для всех сразу)
export function closePopup(element) {
    const closeButton = element.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closePopupDef(element);
    })
}

export function closeOverlayPopup(element) {
    element.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopupDef(element);
        }
    })
}

export function closeEscPopup(element)  {
    document.addEventListener('keydown', function(evt) {
        if (evt.key === 'Escape')  {
            closePopupDef(element);
        }
    })
}
