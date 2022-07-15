class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._handleCardClick = handleCardClick; //the code to open the image popup
    this._handleDeleteClick = handleDeleteClick; //the code to open the delete popup
    this._handleLikeClick = handleLikeClick; //the code to tell the server the card has been liked
    this._cardName = data.name;
    this._cardLink = data.link;

    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._cardTemplate = document
      .querySelector(templateSelector)
      .content.querySelector(".element");
    //select the template, use .content to get the content inside the template, then query selector again to get the element class
    this.element; //will be set to the card element
    this._cardImage; //will be set to the image in the card

    this._likeButton;
    this._deleteButton;
    this._deleteButtonImage;
    this._numLikesText;
    this._isLikedByCurrentUser; //use to handle user liking and disliking cards
  }

  getId() {
    return this._id;
  }
  createCardElement(userData) {
    //make a copy of the template using cloneNode
    this._element = this._getElement();
    //query selector the like and delete button and number of likes
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__trash");
    this._deleteButtonImage = this._element.querySelector(
      ".element__trash-image"
    );

    this._numLikesText = this._element.querySelector(".element__like-text");

    //query selector the image. when this image is clicked on, a popup opens.
    this._cardImage = this._element.querySelector(".element__image");

    console.log(userData.getUserInfo().name); //gets the current user- the one who is on the webpage
    console.log(this._owner);
    console.log(this._owner.name);
    //enable/disable the trash icon based on if current user is the one who made the card
    if (userData.getUserInfo().name === this._owner.name) {
      console.log("user matches! you can delete this card if u want :)");
    } else {
      console.log("u cannot delete");
      this._deleteButton.remove();
    }
    this._isLikedByCurrentUser = false; //card is not liked when it is first created
    this._setImageAndName();
    this._loadLikes();
    this._setEventListener();

    //return new card so that it can be added to the grid when this function is called
    return this._element;
  }

  getIsLikedByCurrentUser() {
    return this._isLikedByCurrentUser;
  }
  _getElement() {
    return this._cardTemplate.cloneNode(true); //true clones everything inside
  }
  _setEventListener() {
    //add event listeners for like and delete
    this._likeButton.addEventListener("click", (evt) => this._like(evt));
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    ); //send it the function name ie this._delete with NOPARENTHESES. this._delete() BAD, WILL CALL FUNCTION ON PAGE LOAD
    //unless of course you are doing an arrow funtion similar to (evt) => this._like(evt)
    //ps u can do either way (evt) => this._like(evt)  OR (evt) => {this._like(evt)}  -- brackets are optional

    //add event listener to image
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  } //end _setEventListener

  _toggleIsLiked() {
    console.log(this._isLikedByCurrentUser);
    if (this._isLikedByCurrentUser == false) {
      this._isLikedByCurrentUser = true;
    } else {
      this._isLikedByCurrentUser = false;
    }
    console.log(this._isLikedByCurrentUser);
  }
  _like(evt) {
    const heart = evt.target; //the event target is the heart button that the user clicked on
    heart.classList.toggle("element__like_active");
    //update the number of likes to the server
    this._handleLikeClick();
    this._toggleIsLiked();

    //if ((this._isLikedByCurrentUser = true)) {
    this._numLikesText.textContent = this._likes.length;
  }

  deleteFromPage = () => {
    //code that deletes the card from the page. Does NOT  delete it from server
    this._element.remove();
    this._element = null; //help out the garbage collector
  };

  _loadLikes() {
    if (this._likes != null) {
      this._numLikesText.textContent = this._likes.length; //this._likes is an array full of users who liked the image.
      //length gives the number of users/length of the array/number of likes
    } else {
      this._numLikesText.textContent = 0;
    }
  }
  _setImageAndName() {
    this._cardImage.style = `background-image:url(${this._cardLink});`; //template literal has ` at the beginning and end instead of ""
    //also template literal has ${cardLink} (no quotes) even though cardLInk is a string
    //use .src here if image tag, I am using style and background image because it is button
    this._element.querySelector(".element__text").textContent = this._cardName;
  }
}

export { Card };
