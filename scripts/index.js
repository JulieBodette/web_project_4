import {
  hideInputError,
  customSettings,
} from "./FormValidator.js";

import {
  Card
} from "./Card.js";

import {closeModal} from "./utils.js";

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
//we send this to the Card constructor
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");
//get a reference to the grid/container that we will put the cards in
const cardsGrid = document.querySelector(".grid");

//loop thru the initialCards array and send each one into the getCardElement function
initialCards.forEach(function (item) {
  const cardObj = new Card(item, cardTemplate);//create a card object
  const newCard = cardObj.createCardElement(); //create a card element
  cardsGrid.append(newCard); //append it to the grid
});


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
    //because we reset the form fields to previous values, they should all be valid- so we clear the error for each one
    hideInputError(form, inputElement, customSettings);
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
  const cardObj = new Card(newCardInfo, cardTemplate);//create a card object
  const newCard = cardObj.createCardElement(); //create a card element

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


