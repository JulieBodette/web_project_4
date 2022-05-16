const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.remove(settings.inputErrorClass); //the class that makes it invisible
  errorElement.classList.add(settings.errorClass); //the class that makes it visible
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(settings.inputErrorClass); //the class that makes it invisible
  errorElement.classList.remove(settings.errorClass); //the class that makes it visible
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  //this function does not use settings but the function that it calls does
  //therefore we must send it settings so it can pass them on
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, settings); //initial toggle of the button on page load
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      //event listener triggers when text is input:
      checkInputValidity(formElement, inputElement, settings); //check if the input is valid (see if error should be displayed)
      toggleButtonState(inputList, buttonElement, settings); //check if input is valid (see if submit button should be active)
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  //use Array.from to make it into an array, so that we can use forEach() to loop thru it
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
};

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input-text",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
});
