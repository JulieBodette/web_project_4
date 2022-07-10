import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit // "#delete-card-modal"is the popupSelector
  ) {
    super(popupSelector); //set up this._modal
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modal.querySelector(".modal__form");

    this._cardToDelete;
  }

  setCardToDelete(cardObj) {
    this._cardToDelete = cardObj;
  }

  setEventListeners() {
    //add the click event listener to the close icon.
    super.setEventListeners();
    //add the submit event handler to the form
    // Connect the handler to the form: it will watch the submit event
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(); // stops the browser from submitting the form in the default way.
      this._handleFormSubmit(this._cardToDelete); //send it the card object???

      //CODE TO DELETE THE CARD in handkle form submit AND USE API CALL

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
