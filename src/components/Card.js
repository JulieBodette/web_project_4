class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this._handleCardClick = handleCardClick; //the code to open the image popup
    this._handleDeleteClick = handleDeleteClick; //the code to open the delete popup
    this._handleLikeClick = handleLikeClick; //the code to tell the server the card has been liked
    //get data from api- does the user like the card

    this.currentUserId = currentUserId;
    this._cardName = data.name;
    this._cardLink = data.link;

    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._cardTemplate = document
      .querySelector(templateSelector)
      .content.querySelector(".element");
    //select the template, use .content to get the content inside the template, then query selector again to get the element class
    this.element = null; //will be set to the card element
    this._cardImage = null; //will be set to the image in the card

    this._likeButton = null;
    this._deleteButton = null;
    this._deleteButtonImage = null;
    this._numLikesText = null;
  }

  getId() {
    return this._id;
  }
  createCardElement() {
    //make a copy of the template using cloneNode
    this._element = this._getElement();
    //query selector the like and delete button and number of likes
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__trash");
    this._deleteButtonImage = this._element.querySelector(
      ".element__trash-image"
    );
    this._heart = this._element.querySelector(".element__like-image");

    this._numLikesText = this._element.querySelector(".element__like-text");

    //query selector the image. when this image is clicked on, a popup opens.
    this._cardImage = this._element.querySelector(".element__image");

    //enable/disable the trash icon based on if current user is the one who made the card
    console.log("current user" + this.currentUserId);
    console.log("card id" + this._owner._id);
    if (this.currentUserId !== this._owner._id) {
      this._deleteButton.remove();
    }
    this._setImageAndName();
    this._renderLikes();

    this._setEventListener();
    ////////////////////////////////////////////////////////CODEEEEEEEEEEE

    //return new card so that it can be added to the grid when this function is called
    return this._element;
  }

  isLiked() {
    // return true if user liked the card, otherwise false
    let isLiked = false;
    this._likes.forEach((like) => {
      if (like._id === this.currentUserId) {
        isLiked = true;
      }
    });
    return isLiked;
  }

  _renderLikes() {
    //set  likes counter content using this._likes.length
    this._numLikesText.textContent = this._likes.length;
    if (this.isLiked()) {
      // add active class to like button
      this._heart.classList.add("element__like_active");
    } else {
      // remove active class from like button
      this._heart.classList.remove("element__like_active");
    }
  }

  _getElement() {
    return this._cardTemplate.cloneNode(true); //true clones everything inside
  }
  _setEventListener() {
    //add event listeners for like and delete
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
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

  //use to get likes from server
  setLikes(likesArray) {
    this._likes = likesArray;
    //show to the user the number of likes
    this._renderLikes();
  }

  deleteFromPage = () => {
    //code that deletes the card from the page. Does NOT  delete it from server
    this._element.remove();
    this._element = null; //help out the garbage collector
  };

  _setImageAndName() {
    this._cardImage.style = `background-image:url(${this._cardLink});`; //template literal has ` at the beginning and end instead of ""
    //also template literal has ${cardLink} (no quotes) even though cardLInk is a string
    //use .src here if image tag, I am using style and background image because it is button
    this._element.querySelector(".element__text").textContent = this._cardName;
  }
}

export { Card };
