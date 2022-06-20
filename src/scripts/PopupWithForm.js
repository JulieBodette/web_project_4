import Popup from "./popup"

class PopupWithForm extends Popup{
    constructor(popupSelector, submitFunction) //"#image-popup" is the popupSelector
    {
        super(popupSelector);
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
    }

    close()
    {
        //reset the form once the popup is closed.
    }

}

export default PopupWithForm;