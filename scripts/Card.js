
import {imagePopup, openModal, setDataImagePopup} from "./utils.js";
class Card {
    constructor(data, templateSelector){
      this.cardName = data.name;
      this.cardLink = data.link;
      this.cardTemplate = document.querySelector(templateSelector).content.querySelector(".element");
      //select the template, use .content to get the content inside the template, then query selector again to get the element class
      this.newCard; //will be set to the card element
      this.cardImage; //will be set to the image in the card

    }
    createCardElement()
    {
      //make a copy of the template using cloneNode
    this.newCard = this.cardTemplate.cloneNode(true); //true clones everything inside
  
    this._setImageAndName();
    this._setEventListener();
  
    //return new card so that it can be added to the grid when this function is called
    return this.newCard;
    }
    _setEventListener()
    {
  
    //query selector the like and delete button
    const likeButton = this.newCard.querySelector(".element__like");
    const deleteButton = this.newCard.querySelector(".element__trash");
    //add event listeners for like and delete
    likeButton.addEventListener("click", this._like); //send it the function name ie this._like with NOPARENTHESES. this._like() BAD, WILL CALL FUNCTION ON PAGE LOAD
    deleteButton.addEventListener("click", this._delete);

    //query selector the image. when this image is clicked on, a popup opens.
    const cardImage = this.newCard.querySelector(".element__image");
    //add event listener to image
    cardImage.addEventListener("click", () => {this._openImagePopup()});
    

    } //end _setEventListener

    _like(evt)
    {
      const heart = evt.target;//the event target is the heart button that the user clicked on
      heart.classList.toggle("element__like_active");
    }

    _openImagePopup()
    {
      setDataImagePopup(this.cardName, this.cardLink); 
      openModal(imagePopup);
    }

    _delete(evt)
    {
      const trash = evt.target;//the event target is the trash button that the user clicked on
      const card = evt.target.closest('.element'); //gets the closest parent with class element. First parent is button, second is element div
      card.remove();
    }
  
    _setImageAndName()
    {
      this.cardImage = this.newCard.querySelector(".element__image");
    this.cardImage.style = `background-image:url(${this.cardLink});`; //template literal has ` at the begginign and end instead of ""
    //also template literal has ${cardLink} (no quotes) even though cardLInk is a string
    //use .src here if image tag, I am using style and background image because it is button
    this.newCard.querySelector(".element__text").textContent = this.cardName;
  
    }
  
  }

  function renderCard(data, templateSelector)
  {
    //return a card element
    //templateSelector should be set to "#card-template" (may change if more card templates are added)
    const cardObj = new Card(data, templateSelector);//create a card object
    const newCard = cardObj.createCardElement(); //create a card element
    return newCard;
  }

  export {renderCard};