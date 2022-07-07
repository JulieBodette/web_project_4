import "./index.css";
import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";

import { customSettings } from "../components/constants.js";

import Section from "../components/section.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { Api } from "../components/Api.js";

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

/////Getting info from server
//Token: 7201271b-2cce-46ab-9f28-d324b822f8cb
//Group ID: group-12

fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "7201271b-2cce-46ab-9f28-d324b822f8cb",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "7201271b-2cce-46ab-9f28-d324b822f8cb",
    "Content-Type": "application/json",
  },
});

//use the Api object to load the initial cards from the server
api
  .getInitialCards()
  .then((res) => res.json())
  .then((result) => {
    console.log("this is during the fetch promise");
    console.log(result);
    console.log("this is during the fetch promise after we log the result");
    const cardGridObject = new Section(
      {
        items: result,
        renderer: (data) => {
          renderCard(cardGridObject, data, imagePopupObj);
        },
      },
      ".grid"
    );
    cardGridObject.renderItems();
  });

//define a function to add cards to the grid
function renderCard(cardContainer, data, cardPopupObj) {
  const cardObj = new Card(data, "#card-template", () => {
    cardPopupObj.open(data);
  }); //create a card object

  const newCard = cardObj.createCardElement(); //create a card element
  cardContainer.addItem(newCard);
}

//create 1 global PopupWithImage object. Image is set to be different when differnt cards are clicked on (via open() method)
//templateSelector should be set to "#card-template" (may change if more card templates are added)
const imagePopupObj = new PopupWithImage("#image-popup"); //create popup image for card
imagePopupObj.setEventListeners();

//create 1 global UserInfo object
const user = new UserInfo({
  userName: ".profile__info-name",
  userJob: ".profile__info-title",
});

/////////////////////////get all forms and create FormValidator objects out of them

const formElementsList = Array.from(
  document.querySelectorAll(customSettings.formSelector)
);
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
const editProfileFormObj = formValidatorObjList.find(
  (obj) => obj.formElement.getAttribute("name") == "nameandtitle"
);
const addCardFormObj = formValidatorObjList.find(
  (obj) => obj.formElement.getAttribute("name") == "imagenameandlink"
);

//////////////////////////////////////////////////////////////////////make the PopupWithFormObject for each form
const editProfileFormPopupObj = new PopupWithForm(
  "#edit-profile-modal",
  (values) => {
    //values is an object returned by _handleFormSubmit
    user.setUserInfo({ newName: values.name, newJob: values.title });
    editProfileFormPopupObj.close();
  }
);
editProfileFormPopupObj.setEventListeners();
//editProfileFormPopupObj._getInputValues(); //calling private method for testing purposes

const addCardFormPopupObj = new PopupWithForm("#add-card-modal", () => {
  //make a new object to store the image url and image label
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
  };

  renderCard(cardGridObject, newCardInfo, imagePopupObj);

  addCardForm.reset(); //clear out the input fields
  addCardFormObj.setButtonInactive(); //Set button to inactive-it needs to be hidden because the fields are empty
  addCardFormPopupObj.close(); //close the modal panel when submitted
});
addCardFormPopupObj.setEventListeners();

/////////////////////////////////////////////////////////////////////add click events to buttons that open form modals
//Set up button that opens add card modal
addCardButton.addEventListener("click", () => {
  addCardFormPopupObj.open();
});

//Set up button that opens edit profile modal
editProfileButton.addEventListener("click", () => {
  editProfileFormPopupObj.open();
  //this makes sure data in the form field is correct if you close without saving
  //if you close without saving it should be set to the previous values from the page, NOT whatever u typed and didnt save
  nameInput.value = nameText.textContent;
  titleInput.value = titleText.textContent;

  editProfileFormObj.clearAllErrors(); //because we reset the form fields to previous values, they should all be valid- so we clear the error for each one
});
