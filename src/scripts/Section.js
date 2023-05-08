export default class Section {
  // Init

  constructor(render, containerSelector) {
    this._render = render;
    this._containerSelector = containerSelector;

    this._container = document.querySelector(this._containerSelector);
  }

  // Public 

  renderElements(items) {
    items.forEach((item) => {
      this._render(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}

export { Section }