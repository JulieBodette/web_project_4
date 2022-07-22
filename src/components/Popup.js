class Popup {
  constructor(popupSelector) {
    this._modal = document.querySelector(popupSelector);
    this._button = this._modal.querySelector(".modal__close-button");
  }
  open() {
    /* The visible class overrides the previous class because its farther down the page. see modal.css.*/
    this._modal.classList.add(
      "modal_open"
    ); /*activate a class that makes it visible*/
    
    document.addEventListener("keydown", this._handleEscClose); //close on esc
  }

  close() {
    this._modal.classList.remove(
      "modal_open"
    ); /*deactivate a class that makes it visible*/
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) =>{
    //this is an arrow function
    //that way, we do not have to create an arrow function when setting the event listener
    //also because we do not create a new arrow function when setting event listener, we can remove this event listener
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //close when X is clicked
    this._button.addEventListener("click", () => this.close());

    this._modal.addEventListener("mousedown", (evt) => {
      //use mousedown so that if user clicks on box and drags outside, this event does not trigger
      //only triggers if they click outside modal box

      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}

export default Popup;
