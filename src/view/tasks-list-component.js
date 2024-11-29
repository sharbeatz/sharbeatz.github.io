import { AbstractComponent } from './abstract-component.js';

function createTaskListTemplate({ status, label }) {
  return (
    `
    <li class="tasks">
        <h4 class="title-tasks ${status}">${label}</h4>
        <ul class="tasks ${status}">
        </ul>
    </li>
    `
  );
}

export default class TasksListComponent extends AbstractComponent {
  constructor({ status, label, onTaskDrop}) {
    super();
    this.status = status;
    this.label = label;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListTemplate({ status: this.status, label: this.label });
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;
    let draggedOverTask = null;

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
      // Находим ближайший элемент задачи, над которым идет перетаскивание
      draggedOverTask = event.target.closest(".task");

    });

    container.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      // Получаем ID задачи, перед которой нужно вставить
      const position = draggedOverTask ? draggedOverTask.dataset.taskId : null;

      onTaskDrop(taskId, this.status, position);
    });
  }
}



