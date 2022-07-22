//The Section class doesn't have markup.
//It receives markup through the callback function and inserts it in the container.

class Section {
  //The items property serves as an array of data,
  //which you need to add on a page when initializing the class.
  //The renderer property is a function responsible for creating and
  //rendering data on a page.
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  }

  setItems(items) {
    //used to set the items after initialization
    this._itemsArray = items;
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
