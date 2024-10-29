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
    this.#afterCreateElement();
  }

  get template() { // Используем геттер вместо метода getTemplate
    return createTaskTemplate(this.task);
  }

  #afterCreateElement() {
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable() {
    this.element.setAttribute(`draggable`, true);

    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.task.id);
    });
  }

}


