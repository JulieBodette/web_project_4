import Popup from "./popup"

class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit) //"#image-popup" or "#edit-profile-modal" or "#add-card-modal" is the popupSelector
    {
        super(popupSelector); //set up this._modal
        this.handleFormSubmit = handleFormSubmit;
        this._form = this._modal.querySelector(".modal__form");
    }

    _getInputValues()
    {
        //collects data from all the input fields
        console.log("input values set");
        const inputs = this._form.querySelectorAll("input");
        console.log(inputs);
        inputs.forEach(input =>
        {console.log(input.value)}
        );
        //returns that data as an object.
    }

    setEventListeners()
    {
        
        //add the click event listener to the close icon.
        super.setEventListeners();
        //add the submit event handler to the form 


        // Connect the handler to the form: it will watch the submit event
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault(); // stops the browser from submitting the form in the default way.
            this.handleFormSubmit();});
        //we did not explicitly find the submit button...just listening to the event
        //pressing enter also submits
    }

    close()
    {
        //reset the form once the popup is closed.
        super.close();
        this._form.reset();
    }

}

export default PopupWithForm;