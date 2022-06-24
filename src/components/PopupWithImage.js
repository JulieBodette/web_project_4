import Popup from "./Popup"

class PopupWithImage extends Popup{
    constructor(popupSelector) //"#image-popup" is the popupSelector
    {
        super(popupSelector);
        
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
    open(data)//data contains name and link. sent here and not in the constructor
    {
        this.name = data.name;
        this.link = data.link;
        this._setDataImagePopup();
        super.open();
    }
    
}

export default PopupWithImage;

