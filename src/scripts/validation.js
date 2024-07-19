
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
    toggleButtonState(inputList, buttonElement, validConfiguration);
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
        return !inputElement.validity.valid;
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
};
