import { customSettings } from "../utils/Constants.js";
class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(this.settings.inputErrorClass); //the class that makes it invisible
    errorElement.classList.add(this.settings.errorClass); //the class that makes it visible
  }

  //public because it is used in index.js for hiding error on form reset
  //assumes all form fields are valid (does not check!!)

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.add(this.settings.inputErrorClass); //the class that makes it invisible
    errorElement.classList.remove(this.settings.errorClass); //the class that makes it visible
    errorElement.textContent = "";
  }
  clearAllErrors() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(customSettings.inputSelector)
    );
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  _checkInputValidity(inputElement) {
    //this function does not use settings but the function that it calls does
    //therefore we must send it settings so it can pass them on
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this.settings.inactiveButtonClass);
    buttonElement.disabled = true; //disable the button so the user cannot submit the form, even by pressing Enter
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this.settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  setButtonInactive() {
    //public method called when new card ia added- button needs set to inactive before new values are typed
    const buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );
    this._disableButton(buttonElement);
  }
  enableValidation() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.settings.inputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement); //initial toggle of the button on page load
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        //event listener triggers when text is input:
        this._checkInputValidity(inputElement); //check if the input is valid (see if error should be displayed)
        this._toggleButtonState(inputList, buttonElement); //check if input is valid (see if submit button should be active)
      });
    });
  }
}

// enabling validation by calling enableValidation()
// pass all the settings (in customSettings, in constants.js) on call

//export functions to index.js
export { FormValidator };
