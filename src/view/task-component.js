import {createElement} from '../framework/render.js';


function createTaskTemplate(task) {
  const {title} = task;
    return (
        `
        <li class="task">${title}</li>
        `
      );
}


export default class TaskComponent {

  constructor({ task }) {
    this.task = task;
  }

  getTemplate() {
    return createTaskTemplate(this.task);
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
