import {createElement} from '../framework/render.js';


function createTaskBoardTemplate() {
    return (
        `
        <ul class="task-list">

        </ul>
        `
      );
}

export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardTemplate();
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
