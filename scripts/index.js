import {showInputError, hideInputError, checkInputValidity, customSettings} from "./validate.js";

////////////////////////////////////////////////Set up edit profile text button and modal for it
//use const so that the value does not change
const editProfileButton = document.querySelector("#profile-info-edit-button"); ///find the edit button from profile-this opens the modal panel
const editProfileModal = document.querySelector("#edit-profile-modal"); //using ID to find the modal (pop up). ID is unique, makes it a little better than a class. needed because there are multiple modals (pop ups) with same class
const editProfileForm = editProfileModal.querySelector(".modal__form"); //find the form. form has 2 text boxes and a submit button. Search within editProfileModal instead of document so that we find the correct form
//find the text on the page that shows name and title
const nameText = document.querySelector(".profile__info-name");
const titleText = document.querySelector(".profile__info-title");

// find the form fields in the DOM
const nameInput = editProfileForm.querySelector('[name="name"]');
const titleInput = editProfileForm.querySelector('[name="title"]');
//////////////////////////////////////////////////////////

/////////////////////////////////////////////////////Set up add card button and modal for it
const addCardButton = document.querySelector("#profile-add-button"); ///find the + button (add card)-this opens the modal panel
const addCardModal = document.querySelector("#add-card-modal"); //using ID to find the modal (pop up).
const addCardForm = addCardModal.querySelector(".modal__form"); //find the form.

// find the form fields in the DOM
const imageNameInput = addCardForm.querySelector('[name="imagename"]');
const imageLinkInput = addCardForm.querySelector('[name="imagelink"]');
/////////////////////////////////////////////

//making the initial cards via Javascript
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
//select the template, use .content to get the content inside the template, then query selector again to get the element class
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");
//get a reference to the grid/container that we will put the cards in
const cardsGrid = document.querySelector(".grid");

//select the image popup and its picture and text and X (close button)
const imagePopup = document.querySelector("#image-popup");
const imagePopupPic = imagePopup.querySelector(".popup__image");
const imagePopupText = imagePopup.querySelector(".popup__caption");

//create a card and add it to the cardsGrid
//this function must be created before it is called because its stored in a variable
const createCardElement = (data) => {
  //data = name and link
  //get the name and the link out of data (data is an object)
  const cardName = data.name;
  const cardLink = data.link;

  //make a copy of the template using cloneNode
  const newCard = cardTemplate.cloneNode(true); //true clones everything inside

  //look within the card template for the spots where the name and link go, set them up
  const cardImage = newCard.querySelector(".element__image"); //used later to set up click event for image modal
  cardImage.style = `background-image:url(${cardLink});` //template literal has ` at the begginign and end instead of ""
  //also template literal has ${cardLink} (no quotes) even though cardLInk is a string
  //use .src here if image tag, I am using style and background image because it is button
  newCard.querySelector(".element__text").textContent = cardName;

  //add event listener for cardImage- so that image modal pops up when clicked
  cardImage.addEventListener("click", function (evt) {
    setDataImagePopup(data);
    openModal(imagePopup);
  });
  //return new card so that it can be added to the grid when this function is called
  return newCard;
};

//loop thru the initialCards array and send each one into the getCardElement function
initialCards.forEach(function (item) {
  const newCard = createCardElement(item); //get the card element
  cardsGrid.append(newCard); //append it to the grid
});
//////////////////////////////////////////Set up event listeners for like and delete for cards (delegated via cardsGrid)
  cardsGrid.addEventListener("click", function (evt) { //likeButton
    if(evt.target.classList.contains("element__like_image"))
    {
      console.log("liked");
    evt.target.classList.toggle("element__like_active");
    }
  });
  cardsGrid.addEventListener("click", function (evt) { //deleteButton
    console.log("deleted"+evt.target);
    if(evt.target.classList.contains("element__trash_image"))
    {
      console.log("deleted");
    const card = evt.target.closest(".element"); //gets the closest parent with class element. First parent is button, second is element div
    card.remove();
    }
  });
////////////////////////////////////////////////////////////Set up image popup
function setDataImagePopup(data) {
  //called in AddCardElement
  //data = name and link
  //get the name and the link out of data (data is an object)
  //data.name data.link;
  imagePopupPic.src = data.link;
  imagePopupText.textContent = data.name;
  imagePopupPic.alt = data.name;
}
/////////////////////////////////////////

////////////////////////////////////////////////Set up edit profile modal
editProfileButton.addEventListener("click", () => {
  openModal(editProfileModal);
  //this makes sure data in the form field is correct if you close without saving
  //if you close without saving it should be set to the previous values from the page, NOT whatever u typed and didnt save
  nameInput.value = nameText.textContent;
  titleInput.value = titleText.textContent;
  //get the parameters to send to checkInputValidity
  const form = editProfileModal.querySelector(customSettings.formSelector);
  const inputList = Array.from(
    form.querySelectorAll(customSettings.inputSelector)
  );
  //loop through all fields in the form and call checkInputValidity to determine if they are valid (and if error should be displayed)
  inputList.forEach((inputElement) => {
    checkInputValidity(form, inputElement, customSettings);
  });
  
});

//Pressing the submit button updates the name and title on the page to be the newly entered values
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // stops the browser from submitting the form in the default way.

  // Insert new values using the textContent
  // property of the querySelector() method
  nameText.textContent = nameInput.value;
  titleText.textContent = titleInput.value;
  closeModal(editProfileModal); //close the modal panel when submitted
}

// Connect the handler to the form: it will watch the submit event
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
//we did not explicitly find the submit button...just listening to the event
//pressing enter also submits
////////////////////////////////////////////////

////////////////////////////////////////////////Set up add card modal
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

//pressing submit button adds a new card with picture and title from user
function handleAddCardSubmit(evt) {
  evt.preventDefault(); // stops the browser from submitting the form in the default way.

  //make a new object to store the image url and image label
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
  };
  const newCard = createCardElement(newCardInfo); //create a new card and add to screen
  cardsGrid.prepend(newCard); //prepend it to the grid (add to beginning)
  //clear out the input fields
  imageNameInput.value = "";
  imageLinkInput.value = "";
  closeModal(addCardModal); //close the modal panel when submitted
}
addCardForm.addEventListener("submit", handleAddCardSubmit);
////////////////////////////////////////////////

///////////////////////////////Universal Handler for ALL modal close buttons (X)
// find all close buttons
const closeButtons = Array.from(
  document.querySelectorAll(".modal__close-button")
); //use Array.from to convert to array

closeButtons.forEach((button) => {
  // find the closest modal
  const modal = button.closest(".modal");
  // set the listener
  button.addEventListener("click", () => closeModal(modal));
});
/////////////////////////////////////////////Add event listeners to Close all modals by clicking outside them
const modals = Array.from(document.querySelectorAll(".modal"));
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    //use mousedown so that if user clicks on box and drags outside, this event does not trigger
    //only triggers if they click outside modal box

    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modal);
    }
  });
  //add listener to document- close the modal on esc
  document.addEventListener("keydown", (evt) => {
    //add it to document and not modal so it detects if you hit esc even if you are not focused on modal.
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
}); //end forEach

///////////////////////////////////////////////////////////////////Universal Open/Close Modal Functions
function openModal(modal) {
  /* The visible class overrides the previous class because its farther down the page. see modal.css.*/
  modal.classList.add("modal_open"); /*activate a class that makes it visible*/
}

function closeModal(modal) {
  modal.classList.remove(
    "modal_open"
  ); /*deactivate a class that makes it visible*/
}
