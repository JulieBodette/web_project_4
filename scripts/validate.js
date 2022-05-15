const showInputError = (formElement, inputElement, errorMessage) => {
    console.log("show input error");
    /*
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
    */
  };
  
  const hideInputError = (formElement, inputElement) => {
    console.log("hide input error");
    /*
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
    */
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    console.log("check input validity");
    /*
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
    */
  };
  
  const hasInvalidInput = (inputList) => {
      console.log("hasInvalidInput function called")
    return inputList.some((inputElement) => {
        console.log(inputElement.validity.valid);
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement, settings) => {
      console.log("toggle button");
    console.log("is the input invalid?"+hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${settings.inactiveButtonClass}`);
    } else {
      buttonElement.classList.remove(`${settings.inactiveButtonClass}`);
    }
  };
  
  const setEventListeners = (formElement, settings) => {
      console.log("set event listeners");
      const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
      console.log(inputList);
      const buttonElement = formElement.querySelector(`${settings.submitButtonSelector}`);
      console.log(buttonElement);
      toggleButtonState(inputList, buttonElement, settings); //initial toggle of the button on page load 
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            //event listener triggers when text is input: 
            checkInputValidity(formElement, inputElement); //check if the input is valid (see if error should be displayed)
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