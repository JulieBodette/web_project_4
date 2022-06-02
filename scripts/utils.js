//the event handlers and the function that opens/closes modal windows.

//setDataImagePopup(name, link) and openModal(imagePopup) are used by Card.js



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


  const imagePopup = document.querySelector("#image-popup");

////////////////////////////////////////////////////////////Set up image popup
function setDataImagePopup(name, link) {
    //name and link are strings
    //from the DOM, select the image popup and its picture and text and X (close button)
    const imagePopupPic = imagePopup.querySelector(".popup__image");
    const imagePopupText = imagePopup.querySelector(".popup__caption");
    imagePopupPic.src = link;
    imagePopupText.textContent = name;
    imagePopupPic.alt = name;
  }


  export {imagePopup, openModal, closeModal, setDataImagePopup};