import Popup from "./popup"

class PopupWithImage extends Popup{
    constructor(data, popupSelector) //"#image-popup" is the popupSelector
    {//data contains name and link
        super(popupSelector);
        this.name = data.name;
        this.link = data.link;
    }
    _setDataImagePopup() {
        //name and link are strings
        //from the DOM, select the image popup and its picture and text and X (close button)
        const imagePopupPic = this._modal.querySelector(".popup__image");
        const imagePopupText = this._modal.querySelector(".popup__caption");
        imagePopupPic.src = this.link;
        imagePopupText.textContent = this.name;
        imagePopupPic.alt = this.name;
      }
    open()
    {
        this._setDataImagePopup();
        super.open();
    }
    
}

export default PopupWithImage;

