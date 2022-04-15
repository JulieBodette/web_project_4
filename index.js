//use const so that the value does not change
const editProfileModal = document.querySelector("#edit-profile-modal"); //using ID to find it. ID is unique, makes it a little better than a class
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');
//use the modal panel to find the stuff inside it. finding by class.
const profileAddButton = document.querySelector("#openModal"); ///find the add button from profile-this opens the modal panel

//find the text on the page that shows name and title
const nameText = document.querySelector(".profile__info-name");
const titleText = document.querySelector(".profile__info-title");

/////////////open and close the modal
function OpenModal() {
editProfileModal.classList.add("modal_open"); /*activate a class that makes it visible*/
/* The visible class overrides the previous class because its farther down the page. see modal.css.*/
}
function CloseModal() {
editProfileModal.classList.remove("modal_open"); /*deactivate a class that makes it visible*/
}
editProfileCloseButton.addEventListener("click", CloseModal);
profileAddButton.addEventListener("click", OpenModal);
/////////////////////

//Fill in the text boxes on the modal panel with the values from the page
//this just...happened?? and it works?? I didn't explicitly code this...


//Pressing the submit button updates the name and title on the page to be the newly entered values

const formElement = document.querySelector(".modal__form"); //find the form. form has 2 text boxes and a submit button

// The form submit handler
function handleProfileFormSubmit(evt) {
    evt.preventDefault();     // stops the browser from submitting the form in the default way.
    // find the form fields in the DOM
    let nameInput = formElement.querySelector('[name="name"]');
    let titleInput = formElement.querySelector('[name="title"]');

    // Insert new values using the textContent 
    // property of the querySelector() method
    nameText.textContent = nameInput.value;
    titleText.textContent = titleInput.value;
    CloseModal() //close the modal panel when submitted
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit); 
//we did not explicitly find the submit button...just listening to the event








