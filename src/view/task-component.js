import {createElement} from '../framework/render.js';


function createTaskTemplate() {
    return (
        `
        <li class="task">Выучить JS</li>
        `
      );
}


export default class TaskComponent {
  getTemplate() {
    return createTaskTemplate();
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
