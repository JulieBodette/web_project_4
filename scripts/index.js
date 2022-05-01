//use const so that the value does not change
const editProfileModal = document.querySelector("#edit-profile-modal"); //using ID to find it. ID is unique, makes it a little better than a class
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');
//use the modal panel to find the stuff inside it. finding by class.
const profileEditButton = document.querySelector("#openModal"); ///find the add button from profile-this opens the modal panel
const formElement = document.querySelector(".modal__form"); //find the form. form has 2 text boxes and a submit button

//find the text on the page that shows name and title
const nameText = document.querySelector(".profile__info-name");
const titleText = document.querySelector(".profile__info-title");

// find the form fields in the DOM
const nameInput = formElement.querySelector('[name="name"]');
const titleInput = formElement.querySelector('[name="title"]');

//making the initial cards via Javascript
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];
//select the template, use .content to get the content inside the template, then query selector again to get the element class
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");
//get a reference to the grid/container that we will put the cards in
const cardsGrid = document.querySelector(".grid");


//////////////////////////////create a card and add it to the cardsGrid
const addCardElement = data => {
    //data = name and link
    //get the name and the link out of data (data is an object)
    let cardname = data.name;
    let cardlink = data.link;

    //make a copy of the template using cloneNode
    let newCard = cardTemplate.cloneNode(true); //true clones everything inside

    //look within the card template for the spots where the name and link go, set them up
    newCard.querySelector(".element__image").src = cardlink;
    newCard.querySelector(".element__text").textContent = cardname;

    //add the new card to the grid 
    cardsGrid.append(newCard); 
}

//loop thru the initialCards array and send each one into the getCardElement function
initialCards.forEach(
    function (item){
        console.log(item);
        addCardElement(item);         //get the card element and append it to the grid
    }
);



/////////////open and close the modal
function OpenModal() {
editProfileModal.classList.add("modal_open"); /*activate a class that makes it visible*/
/* The visible class overrides the previous class because its farther down the page. see modal.css.*/
//Fill in the text boxes on the modal panel with the values from the page

//this makes sure data in the form field is correct if you close without saving
//if you close without saving it should be set to the previous values from the page, NOT whatever u typed and didnt save
nameInput.value = nameText.textContent;
titleInput.value = titleText.textContent;
}
function CloseModal() {
editProfileModal.classList.remove("modal_open"); /*deactivate a class that makes it visible*/
}
editProfileCloseButton.addEventListener("click", CloseModal);
profileEditButton.addEventListener("click", OpenModal);
/////////////////////

//Pressing the submit button updates the name and title on the page to be the newly entered values
function handleProfileFormSubmit(evt) {
    evt.preventDefault();     // stops the browser from submitting the form in the default way.

    // Insert new values using the textContent 
    // property of the querySelector() method
    nameText.textContent = nameInput.value;
    titleText.textContent = titleInput.value;
    CloseModal() //close the modal panel when submitted
}

// Connect the handler to the form: it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit); 
//we did not explicitly find the submit button...just listening to the event
//pressing enter also submits











