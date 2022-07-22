import "./index.css";
import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";

import { customSettings } from "../utils/Constants.js";

import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import { UserInfo } from "../components/UserInfo.js";

import { Api } from "../utils/Api.js";

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

//set up edit avatar button
const editAvatarButton = document.querySelector("#edit-avatar-button"); ///find button-this opens the modal panel
//const editAvatarModal = document.querySelector("#edit-avatar-modal"); //using ID to find the modal (pop up).
//const editAvatarForm = editAvatarModal.querySelector(".modal__form"); //find the form.
const avatarPic = document.querySelector(".profile__avatar"); //select the avatar image. we will use this to change the image before the page reloads.

// find the form fields in the DOM
const imageNameInput = addCardForm.querySelector('[name="imagename"]');
const imageLinkInput = addCardForm.querySelector('[name="imagelink"]');
/////////////////////////////////////////////

//create 1 global PopupWithImage object. Image is set to be different when differnt cards are clicked on (via open() method)
//templateSelector should be set to "#card-template" (may change if more card templates are added)
const imagePopupObj = new PopupWithImage("#image-popup"); //create popup image for card
imagePopupObj.setEventListeners();

//create 1 global UserInfo object
const user = new UserInfo({
  userName: ".profile__info-name",
  userJob: ".profile__info-title",
  userAvatar: ".profile__avatar",
});

/////Getting info from server
//Token: 7201271b-2cce-46ab-9f28-d324b822f8cb
//Group ID: group-12

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "7201271b-2cce-46ab-9f28-d324b822f8cb",
    "Content-Type": "application/json",
  },
});

const cardGridObject = new Section(
  {
    items: null,
    renderer: (data) => {
      renderCard(cardGridObject, data, imagePopupObj, deleteCardFormPopupObj);
    },
  },
  ".grid"
);

//MUST LOAD THE USER INFO BEFORE THE CARDS
//that way we can check who the cards belong to correctly
//use the Api object to load the user info

//Promise.all() takes multiple promises, and returns a single promise (an array of the results of the input promises)
//it rejects if ANY of the promises throw an error
//we use this to load the user info and get the initial cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoResponse, cardsResponse]) => {
    //user info set up
    user.setAvatar(userInfoResponse.avatar);
    user.setId(userInfoResponse._id);
    user.setUserInfoTextOnly(userInfoResponse);
    //cards set up
    cardGridObject.setItems(cardsResponse);

    cardGridObject.renderItems();
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

//define a function to add cards to the grid
function renderCard(cardContainer, data, cardPopupObj, deletePopupObj) {
  const cardObj = new Card(
    data,
    "#card-template",
    () => {
      cardPopupObj.open(data);
    },
    () => {
      //code for when the delete button is pressed
      deletePopupObj.setAction(() => {
        //this is the handleFormSubmit Function
        deletePopupObj.setLoadingText(true);
        api
          .deleteCard(cardObj.getId()) //api call here to delete the card from server
          .then(() => {
            cardObj.deleteFromPage(); //code to remove the card from the page immediately
            deletePopupObj.close();
          }) //close the modal panel when submitted
          .catch((err) => {
            console.log(err); // log the error to the console
          })
          .finally(() => deletePopupObj.setLoadingText(false));
      });
      deletePopupObj.open(); //open the popup
    },
    //code for when the like button is pressed-tell the server the card was liked
    () => {
      if (!cardObj.isLiked()) {
        api
          .likeCard(cardObj.getId())
          .then((data) => cardObj.setLikes(data.likes))
          .catch((err) => {
            console.log(err); // log the error to the console
          });
        console.log("you liked the card and we r telling server");
      } else {
        api
          .unLikeCard(cardObj.getId())
          .then((data) => cardObj.setLikes(data.likes))
          .catch((err) => {
            console.log(err); // log the error to the console
          });
        console.log("you UNliked the card and we r telling server");
      }
    },
    user.getId()
  ); //create a card object

  const newCard = cardObj.createCardElement(); //create a card element
  cardContainer.addItem(newCard);
}

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
const editAvatarFormObj = formValidatorObjList.find(
  (obj) => obj.formElement.getAttribute("name") == "avatarimage"
);
//////////////////////////////////////////////////////////////////////make the PopupWithFormObject for each form

const editAvatarFormPopupObj = new PopupWithForm(
  "#edit-avatar-modal",
  (values) => {
    //we are defining _handleFormSubmit here
    //values is an object returned by _handleFormSubmit
    //values is and object with a property called avatar
    //avatar is the image link
    editAvatarFormPopupObj.setLoadingText(true);
    api
      .patchUserAvatar(values)
      .then(() => {
        editAvatarFormPopupObj.close();
        user.setAvatar(values.avatar);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      })
      .finally(() => editAvatarFormPopupObj.setLoadingText(false));
    //MUST Change button state in finally block, otherwise the button text won’t change even if an error occurred
  }
);
editAvatarFormPopupObj.setEventListeners();

const editProfileFormPopupObj = new PopupWithForm(
  "#edit-profile-modal",
  (values) => {
    //we are defining _handleFormSubmit here
    //values is an object returned by _handleFormSubmit
    user.setUserInfoTextOnly({ name: values.name, about: values.title }); //possibly values.about instead of values.title????
    editProfileFormPopupObj.setLoadingText(true);
    api
      .patchUserInfo(user.getUserInfo())
      .then(editProfileFormPopupObj.close())
      .catch((err) => {
        console.log(err); // log the error to the console
      })
      .finally(() => editAvatarFormPopupObj.setLoadingText(false));
    //MUST Change button state in finally block, otherwise the button text won’t change even if an error occurred
  }
);
editProfileFormPopupObj.setEventListeners();

const addCardFormPopupObj = new PopupWithForm("#add-card-modal", () => {
  //make a new object to store the image url and image label
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
    likes: [], //starts with no likes
    owner: user.getUserInfo(), //returns name and about
  };

  //upload the card to the server
  addCardFormPopupObj.setLoadingText(true);
  api
    .uploadCard(newCardInfo)
    .then((data) => {
      console.log({ data });

      //send data so that it gets the id info
      renderCard(cardGridObject, data, imagePopupObj, deleteCardFormPopupObj);
    })
    .then(() => {
      addCardFormPopupObj.close();
    }) //close the modal panel when submitted
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => editAvatarFormPopupObj.setLoadingText(false));
  //MUST Change button state in finally block, otherwise the button text won’t change even if an error occurred
});
addCardFormPopupObj.setEventListeners();

//make an object for the "are you sure? delete button"
const deleteCardFormPopupObj = new PopupWithConfirmation("#delete-card-modal");

deleteCardFormPopupObj.setEventListeners();

/////////////////////////////////////////////////////////////////////add click events to buttons that open form modals
//Set up button that opens edit avatar modal
editAvatarButton.addEventListener("click", () => {
  editAvatarFormPopupObj.open();
});

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
