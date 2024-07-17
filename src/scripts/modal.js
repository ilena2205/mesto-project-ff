
//базовые функции открытия и закрытия (для функций кликеров дальше)
export function openPopupDef(element) {
    element.classList.add('popup_is-opened');
    element.classList.add('popup_is-animated');
    document.addEventListener('keydown', addCloseEscListener)
}

export function closePopupDef(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', addCloseEscListener)
}

//функции для закрытия окон через крестик, esc и фон (для всех сразу)
export function addClosePopupButtonListener(element) {
    const closeButton = element.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closePopupDef(element);
    })
}

export function addClosePopupByOverlayListener(element) {
    element.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopupDef(element);
        }
    })
}

export function addCloseEscListener(evt)  { 
    if (evt.key === 'Escape')  { 
        closePopupDef(document.querySelector('.popup_is-opened')); 
    } 
}

export function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
      }
      else {
        button.textContent = 'Сохранить';
      }
}
