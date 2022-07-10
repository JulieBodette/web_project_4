import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit // "#delete-card-modal"is the popupSelector
  ) {
    super(popupSelector); //set up this._modal
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modal.querySelector(".modal__form");
  }

  setEventListeners() {
    //add the click event listener to the close icon.
    super.setEventListeners();
    //add the submit event handler to the form

    // Connect the handler to the form: it will watch the submit event
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(); // stops the browser from submitting the form in the default way.
      //this._handleFormSubmit(this._getInputValues()); //send the inputs from the form (inputs are returned by getInputValues) to the HandleFormSubbmit function

      console.log("sent to server");
    });
    //we did not explicitly find the submit button...just listening to the event
    //pressing enter also submits
  }
}

export default PopupWithConfirmation;
