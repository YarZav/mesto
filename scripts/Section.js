export default class Section {
  // Init

  constructor(items, render, containerSelector) {
    this._items = items;
    this._render = render;
    this._containerSelector = containerSelector;
  }

  // Public 

  renderElements() {
    console.log(this._items);
    this._items.forEach((item) => {
      this._render(item);
    });
  }

  addItem(item) {
    const container = document.querySelector(this._containerSelector);
    container.prepend(item);
  }
}

export { Section }