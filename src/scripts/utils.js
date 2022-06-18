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



  export {openModal, closeModal};