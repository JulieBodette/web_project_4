//The Section class doesn't have markup. 
//It receives markup through the callback function and inserts it in the container.

class Section {
    //The items property serves as an array of data, 
    //which you need to add on a page when initializing the class. 
    //The renderer property is a function responsible for creating and 
    //rendering data on a page.
    constructor({items, renderer}, selector)
    {
        this._items = items;
        this._renderer = renderer;
        this.selector = selector;
    }

    render()
    {
        //for each item in items
        this._renderer();
    }

}


