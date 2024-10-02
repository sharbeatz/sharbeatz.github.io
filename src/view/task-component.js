import { createElement } from '../framework/render.js';
import { AbstractComponent } from './abstract-component.js';

function createTaskTemplate(task) {
  const { title } = task;
  return (
    `
      <li class="task">${title}</li>
    `
  );
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super(); // Необходимо вызывать super() для наследования от AbstractComponent
    this.task = task;
  }

  get template() { // Используем геттер вместо метода getTemplate
    return createTaskTemplate(this.task);
  }

//   getElement() {
//     if (!this.element) {
//       this.element = createElement(this.getTemplate());
//     }


//     return this.element;
//   }


//   removeElement() {
//     this.element = null;
//   }
}
