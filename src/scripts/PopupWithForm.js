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
        //collects data from all the input fields and returns that data as an object.
        console.log("input values set");
    }

    setEventListeners()
    {
        
        //add the click event listener to the close icon.
        super.setEventListeners();
        //add the submit event handler to the form 


        // Connect the handler to the form: it will watch the submit event
//editProfileForm.addEventListener("submit", handleProfileFormSubmit);
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