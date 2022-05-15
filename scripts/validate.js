const showInputError = (formElement, inputElement, errorMessage, settings) => {
    console.log("show input error");
    const errorElement = inputElement.closest(`.${settings.inputErrorClass}`);
    console.log(errorElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`.${settings.errorClass}`);
    /*
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
    */
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    console.log("hide input error");
    const errorElement = formElement.querySelector(`.${settings.inputErrorClass}`);
    errorElement.classList.remove(`.${settings.errorClass}`);
    errorElement.textContent = "";
    /*
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
    */
  };
  
  const checkInputValidity = (formElement, inputElement, settings) => {
    //this function does not use settings but the function that it calls does
    //therefore we must send it settings so it can pass them on
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
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
      buttonElement.classList.add(`${settings.inactiveButtonClass}`);
    } else {
      buttonElement.classList.remove(`${settings.inactiveButtonClass}`);
    }
  };
  
  const setEventListeners = (formElement, settings) => {
      const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
      const buttonElement = formElement.querySelector(`${settings.submitButtonSelector}`);
      toggleButtonState(inputList, buttonElement, settings); //initial toggle of the button on page load 
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            //event listener triggers when text is input: 
            checkInputValidity(formElement, inputElement,settings); //check if the input is valid (see if error should be displayed)
            toggleButtonState(inputList, buttonElement, settings); //check if input is valid (see if submit button should be active)
          });

      });
      /*
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__submit");
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement); 
      });
    });
    */
  };
  
  const enableValidation = (settings) => {
    console.log(settings);
    console.log(settings.inputSelector);
    const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
    //use Array.from to make it into an array, so that we can use forEach() to loop thru it
    console.log(formList);
    formList.forEach((form) => {
        console.log("setting up form");
        setEventListeners(form, settings);
    } );
    /*
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
  
      const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));
  
      fieldsetList.forEach((fieldset) => {
        setEventListeners(fieldset);
      });
    });*/
  };
  
 // enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__input-text",
    submitButtonSelector: ".modal__submit-button",
    inactiveButtonClass: "modal__submit-button_disabled",
    inputErrorClass: "modal__error",
    errorClass: "modal__error_visible"
  });