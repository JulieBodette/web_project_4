//the event handlers and the function that opens/closes modal windows.

//setDataImagePopup(name, link) and openModal(imagePopup) are used by Card.js



///////////////////////////////////////////////////////////////////Universal Open/Close Modal Functions

  
  function closeModal(modal) {
    modal.classList.remove(
      "modal_open"
    ); /*deactivate a class that makes it visible*/
  }



  export {closeModal};