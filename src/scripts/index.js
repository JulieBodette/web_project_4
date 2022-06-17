import "../pages/index.css"
import {
  FormValidator,
  customSettings,
} from "./FormValidator.js";

import {renderCard
} from "./Card.js";

import Card from "./Card.js";

import {openModal, closeModal} from "./utils.js";

import {initialCards} from "./constants.js";

import Section from "./section.js";

import Popup from "./popup.js";

////////////////////////////////////////////////Set up edit profile text button and modal for it
//use const so that the value does not change
const editProfileButton = document.querySelector("#profile-info-edit-button"); ///find the edit button from profile-this opens the modal panel
const editProfileModal = document.querySelector("#edit-profile-modal"); //using ID to find the modal (pop up). ID is unique, makes it a little better than a class. needed because there are multiple modals (pop ups) with same class
const editProfileForm = editProfileModal.querySelector(".modal__form"); //find the form. form has 2 text boxes and a submit button. Search within editProfileModal instead of document so that we find the correct form
//find the text on the page that shows name and title
const nameText = document.querySelector(".profile__info-name");
const titleText = document.querySelector(".profile__info-title");

//////////////////////////////////////////////////////////
// find the form fields in the DOM
const nameInput = editProfileForm.querySelector('[name="name"]');
const titleInput = editProfileForm.querySelector('[name="title"]');
/////////////////////////////////////////////////////Set up add card button and modal for it
const addCardButton = document.querySelector("#profile-add-button"); ///find the + button (add card)-this opens the modal panel
const addCardModal = document.querySelector("#add-card-modal"); //using ID to find the modal (pop up).
const addCardForm = addCardModal.querySelector(".modal__form"); //find the form.

// find the form fields in the DOM
const imageNameInput = addCardForm.querySelector('[name="imagename"]');
const imageLinkInput = addCardForm.querySelector('[name="imagelink"]');
/////////////////////////////////////////////

/////////////////////////get all forms and create FormValidator objects out of them

const formElementsList = Array.from(document.querySelectorAll(customSettings.formSelector));
//get an array of form elements- these are the html elements in the DOM

//map takes each form element in the array and creates the formValidator object for it, then stores the form
//object in the array
const formValidatorObjList = formElementsList.map((form) => {

  //Create a form object and call the public method enableValidation
  const formObj = new FormValidator(customSettings, form);
  formObj.enableValidation();
  return formObj;
}); 

//within the form object, get to the form element and then find the form with the correct name
const editProfileFormObj = formValidatorObjList.find( obj => obj.formElement.getAttribute("name") == "nameandtitle");
const addCardFormObj = formValidatorObjList.find( obj => obj.formElement.getAttribute("name") == "imagenameandlink");

const cardGridObject = new Section({items:initialCards, renderer: (data) => {
//templateSelector should be set to "#card-template" (may change if more card templates are added)
const cardObj = new Card(data, "#card-template");//create a card object
const newCard = cardObj.createCardElement(); //create a card element
cardGridObject.addItem(newCard);
}}, ".grid");

cardGridObject.renderItems();

////////////////////////////////////////////////Set up edit profile modal
editProfileButton.addEventListener("click", () => {
  openModal(editProfileModal);
  //this makes sure data in the form field is correct if you close without saving
  //if you close without saving it should be set to the previous values from the page, NOT whatever u typed and didnt save
  nameInput.value = nameText.textContent;
  titleInput.value = titleText.textContent;
  //get the parameters to send to checkInputValidity
  
  const inputList = Array.from(
    editProfileFormObj.formElement.querySelectorAll(customSettings.inputSelector)
  );
  //loop through all fields in the form and call checkInputValidity to determine if they are valid (and if error should be displayed)
  inputList.forEach((inputElement) => {
    //because we reset the form fields to previous values, they should all be valid- so we clear the error for each one
    editProfileFormObj.hideInputError(inputElement);
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

  const newCard = renderCard(newCardInfo, "#card-template"); //create a card element for the DOM
  cardsGrid.prepend(newCard); //prepend it to the grid (add to beginning)
  addCardForm.reset();   //clear out the input fields
  addCardFormObj.setButtonInactive();  //Set button to inactive-it needs to be hidden because the fields are empty
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
      evt.target.classList.contains("modal") 
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










