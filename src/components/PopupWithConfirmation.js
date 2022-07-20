import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(
    popupSelector // "#delete-card-modal"is the popupSelector
  ) {
    super(popupSelector); //set up this._modal
    this._handleFormSubmit = null;
    this._form = this._modal.querySelector(".modal__form");
  }
  setAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    //add the click event listener to the close icon.
    super.setEventListeners();
    //add the submit event handler to the form
    // Connect the handler to the form: it will watch the submit event
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(); // stops the browser from submitting the form in the default way.
      this._handleFormSubmit();

      console.log("card deleted");
    });
    //we did not explicitly find the submit button...just listening to the event
    //pressing enter also submits
  }

  open() {
    //cardObj is the card we need to delete
    super.open();
  }
}

export default PopupWithConfirmation;
