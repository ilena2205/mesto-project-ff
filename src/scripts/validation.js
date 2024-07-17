
export const validConfiguration = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });

export const showInputError = (formElement, inputElement, errorMessage, validConfiguration) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validConfiguration.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validConfiguration.errorClass);
};

export const hideInputError = (formElement, inputElement, validConfiguration) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validConfiguration.inputErrorClass);
    errorElement.classList.remove(validConfiguration.errorClass);
    errorElement.textContent = '';
};

export const isValid = (formElement, inputElement, validConfiguration) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }


    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validConfiguration);
    } else {
        hideInputError(formElement, inputElement, validConfiguration);
    }
};

export const setEventListeners = (formElement, validConfiguration) => {
    const inputList = Array.from(formElement.querySelectorAll(validConfiguration.inputSelector));
    const buttonElement = formElement.querySelector(validConfiguration.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validConfiguration);
            toggleButtonState(inputList, buttonElement, validConfiguration);
        });
    });
};

export const enableValidation = (validConfiguration) => {
    const formList = Array.from(document.querySelectorAll(validConfiguration.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement,validConfiguration);
    });
};



export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return (!inputElement.validity.valid || inputElement.validity.patternMismatch);
    })
};

export const toggleButtonState = (inputList, buttonElement, validConfiguration) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validConfiguration.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validConfiguration.inactiveButtonClass);
    }
}

export const resetFormValidation = (formElement, validConfiguration) => {
    const inputList = Array.from(formElement.querySelectorAll(validConfiguration.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validConfiguration);
    });
    const buttonElement = formElement.querySelector(validConfiguration.submitButtonSelector);
        buttonElement.disabled = false;
        buttonElement.classList.remove(validConfiguration.inactiveButtonClass);
};

export const resetButtonState = (formElement, validConfiguration) => {
    const buttonElement = formElement.querySelector(validConfiguration.submitButtonSelector);
    buttonElement.disabled = true;
    buttonElement.classList.add(validConfiguration.inactiveButtonClass);
};