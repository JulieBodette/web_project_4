import Popup from "./popup"

class PopupWithForm extends Popup{
    constructor(popupSelector, submitFunction) //"#image-popup" is the popupSelector
    {
        super(popupSelector);
    }

    _getInputValues()
    {
        console.log("input values set");
    }

}

export default PopupWithForm;