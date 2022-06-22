class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._handleCardClick = handleCardClick; //the code to open the image popup
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardTemplate = document
      .querySelector(templateSelector)
      .content.querySelector(".element");
    //select the template, use .content to get the content inside the template, then query selector again to get the element class
    this._element; //will be set to the card element
    this._cardImage; //will be set to the image in the card
  }
  createCardElement() {
    //make a copy of the template using cloneNode
    this._element = this._getElement();

    this._setImageAndName();
    this._setEventListener();

    //return new card so that it can be added to the grid when this function is called
    return this._element;
  }

  _getElement()
  {
    return this._cardTemplate.cloneNode(true); //true clones everything inside
  }
  _setEventListener() {
    //query selector the like and delete button
    const likeButton = this._element.querySelector(".element__like");
    const deleteButton = this._element.querySelector(".element__trash");
    //add event listeners for like and delete
    likeButton.addEventListener("click", this._like); //send it the function name ie this._like with NOPARENTHESES. this._like() BAD, WILL CALL FUNCTION ON PAGE LOAD
    deleteButton.addEventListener("click", () => {this._delete()});

    //query selector the image. when this image is clicked on, a popup opens.
    const cardImage = this._element.querySelector(".element__image");
    //add event listener to image
    cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  } //end _setEventListener

  _like(evt) {
    const heart = evt.target; //the event target is the heart button that the user clicked on
    heart.classList.toggle("element__like_active");
  }

  _delete() {
    this._element.remove();
  }

  _setImageAndName() {
    this._cardImage = this._element.querySelector(".element__image");
    this._cardImage.style = `background-image:url(${this._cardLink});`; //template literal has ` at the begginign and end instead of ""
    //also template literal has ${cardLink} (no quotes) even though cardLInk is a string
    //use .src here if image tag, I am using style and background image because it is button
    this._element.querySelector(".element__text").textContent = this._cardName;
  }
}

export default Card;
