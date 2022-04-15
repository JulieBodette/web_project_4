const editProfileModal = document.querySelector("#edit-profile-modal"); //using ID to find it. ID is unique, makes it a little better than a class
const editProfileCloseButton = editProfileModal .querySelector('.modal__close-button');
//use the modal panel to find the stuff inside it. finding by class.
const profileAddButton = document.querySelector(".profile__add-button"); ///find the add button from profile-this opens the modal panel

function OpenModal() {
    console.log("open");
  editProfileModal.classList.add(".modal_open"); /*activate a class that makes it visible*/
  /* The visible class overrides the previous class because its farther down the page. see modal.css.*/
}
function CloseModal() {
    console.log("close");
  editProfileModal.classList.remove(".modal_open"); /*deactivate a class that makes it visible*/
}
editProfileCloseButton.addEventListener("click", CloseModal);
profileAddButton.addEventListener("click", OpenModal);
