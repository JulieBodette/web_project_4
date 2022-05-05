////////////////////////////////////////////////Set up edit profile text button and modal for it
//use const so that the value does not change
const profileEditButton = document.querySelector("#profile-info-edit-button"); ///find the edit button from profile-this opens the modal panel
const editProfileModal = document.querySelector("#edit-profile-modal"); //using ID to find the modal (pop up). ID is unique, makes it a little better than a class. needed because there are multiple modals (pop ups) with same class
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');//use the modal panel to find the stuff inside it. finding by class.
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
const addCardCloseButton = addCardModal.querySelector('.modal__close-button');//use the modal panel to find the stuff inside it.
const addCardForm = addCardModal.querySelector(".modal__form"); //find the form.

// find the form fields in the DOM
const imageNameInput = addCardForm.querySelector('[name="imagename"]');
const imageLinkInput = addCardForm.querySelector('[name="imagelink"]');
/////////////////////////////////////////////

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

//select the image popup and its picture and text and X (close button)
const imagePopup = document.querySelector("#image-popup");
const imagePopupPic = imagePopup.querySelector(".popup__image");
const imagePopupText = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".modal__close-button");


//create a card and add it to the cardsGrid
//this function must be created before it is called because its stored in a variable
const addCardElement = data => {
    //data = name and link
    //get the name and the link out of data (data is an object)
    const cardName = data.name;
    const cardLink = data.link;

    //make a copy of the template using cloneNode
    const newCard = cardTemplate.cloneNode(true); //true clones everything inside

    //look within the card template for the spots where the name and link go, set them up
    const cardImage = newCard.querySelector(".element__image"); //used later to set up click event for image modal
    cardImage.style = "background-image:url('"+cardLink+"');";
    //use .src here if image tag, I am using style and background image because it is button
    newCard.querySelector(".element__text").textContent = cardName;

    //query selector the like and delete button
    const likeButton = newCard.querySelector(".element__like");
    const deleteButton = newCard.querySelector(".element__trash");
  
    //add event listener for cardImage- so that image modal pops up when clicked
    cardImage.addEventListener("click", function(evt){
      console.log("wow and image");
      createImagePopup(data);
    });


    //add event listeners for like and delete
    likeButton.addEventListener("click", function(evt){
      const Heart = evt.target;//the event target is the heart button that the user clicked on
      Heart.classList.toggle("element__like_active");
    });
    deleteButton.addEventListener("click", function(evt){
      const trash = evt.target;//the event target is the trash button that the user clicked on
      const card = evt.target.closest('.element'); //gets the closest parent with class element. First parent is button, second is element div
      card.remove();
    });
    
    //return new card so that it can be added to the grid when this function is called
    return newCard;

}


//loop thru the initialCards array and send each one into the getCardElement function
initialCards.forEach(
    function (item){
        newCard = addCardElement(item);         //get the card element 
        cardsGrid.append(newCard); //append it to the grid
    }
);

////////////////////////////////////////////////////////////Set up image popup
function createImagePopup(data) { //called in AddCardElement
  //data = name and link
  //get the name and the link out of data (data is an object)
  //data.name data.link;

  imagePopup.classList.add("modal_open");
  imagePopupPic.src = data.link;
  imagePopupText.textContent = data.name;
  console.log("wow look an image popped up");
  console.log(data);
  //add event listener for closing the image popup
}
function closeImagePopup() {
  console.log("closing image popup")
  imagePopup.classList.remove("modal_open"); /*deactivate a class that makes it visible*/
  }
  imagePopupCloseButton.addEventListener("click", closeImagePopup);


/////////////////////////////////////////

////////////////////////////////////////////////Set up edit profile modal
/////////////open and close the modal
function openEditProfileModal() {
editProfileModal.classList.add("modal_open"); /*activate a class that makes it visible*/
/* The visible class overrides the previous class because its farther down the page. see modal.css.*/
//Fill in the text boxes on the modal panel with the values from the page

//this makes sure data in the form field is correct if you close without saving
//if you close without saving it should be set to the previous values from the page, NOT whatever u typed and didnt save
nameInput.value = nameText.textContent;
titleInput.value = titleText.textContent;
}
function closeEditProfileModal() {
editProfileModal.classList.remove("modal_open"); /*deactivate a class that makes it visible*/
}
editProfileCloseButton.addEventListener("click", closeEditProfileModal);
profileEditButton.addEventListener("click", openEditProfileModal);
/////////////////////

//Pressing the submit button updates the name and title on the page to be the newly entered values
function handleProfileFormSubmit(evt) {
    evt.preventDefault();     // stops the browser from submitting the form in the default way.

    // Insert new values using the textContent 
    // property of the querySelector() method
    nameText.textContent = nameInput.value;
    titleText.textContent = titleInput.value;
    closeEditProfileModal() //close the modal panel when submitted
}

// Connect the handler to the form: it will watch the submit event
editProfileForm.addEventListener('submit', handleProfileFormSubmit); 
//we did not explicitly find the submit button...just listening to the event
//pressing enter also submits
////////////////////////////////////////////////

////////////////////////////////////////////////Set up add card modal
function openAddCardModal() {
  addCardModal.classList.add("modal_open"); /*activate a class that makes it visible*/
  }
function closeAddCardModal() {
  addCardModal.classList.remove("modal_open"); /*deactivate a class that makes it visible*/
  }
  addCardCloseButton.addEventListener("click", closeAddCardModal);
  addCardButton.addEventListener("click", openAddCardModal);

  //pressing submit button adds a new card with picture and title from user
  function handleAddCardSubmit(evt) {
    evt.preventDefault();     // stops the browser from submitting the form in the default way.

    //make a new object to store the image url and image label
    const newCardInfo = {
      name: imageNameInput.value,
      link: imageLinkInput.value
    }
    newCard = addCardElement(newCardInfo) //create a new card and add to screen
    cardsGrid.prepend(newCard); //prepend it to the grid (add to beginning)

    closeAddCardModal() //close the modal panel when submitted
}
addCardForm.addEventListener('submit', handleAddCardSubmit);
////////////////////////////////////////////////









