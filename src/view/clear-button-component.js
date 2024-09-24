import {createElement} from '../framework/render.js';


function createClearButtonComponentTemplate() {
    return (
        `
        <li><button>Очистить</button></li>
        `
      );
}


export default class ClearButtonComponent {
  getTemplate() {
    return createClearButtonComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
