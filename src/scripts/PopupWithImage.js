import Popup from "./popup"

class PopupWithImage extends Popup{
    constructor(popupSelector) //"#image-popup" is the popupSelector
    {
        this._modal = document.querySelector(popupSelector);
    }
    _setDataImagePopup(name, link) {
        //name and link are strings
        //from the DOM, select the image popup and its picture and text and X (close button)
        const imagePopupPic = this._modal.querySelector(".popup__image");
        const imagePopupText = this._modal.querySelector(".popup__caption");
        imagePopupPic.src = link;
        imagePopupText.textContent = name;
        imagePopupPic.alt = name;
      }
    open()
    {
        this._setDataImagePopup();
        super.open();
    }
    
}

