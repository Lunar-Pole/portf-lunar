export default class CustomNodeElement {
  constructor() {
    this._element = undefined;
  }

  get element() {
    return this._element;
  }

  set element(newElement) {
    try {
      if (!(newElement instanceof HTMLElement))
        throw new TypeError("Element must be an instance of htmlElement");
      this._element = newElement;
    } catch (error) {
      console.error(error.message);
    }
  }

  createElementFromTag(tag = "pre") {
    const element = document.createElement(tag);
    this.element = element;
  }

  attachClasses(classNames) {
    const currentElement = this.element;
    currentElement.classList.add(...classNames);
  }
}
