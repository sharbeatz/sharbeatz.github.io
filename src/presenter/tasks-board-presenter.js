// import { Status } from '../const.js'; // Импортируем константы
// import TasksListComponent from '../view/tasks-list-component.js';
// import TaskComponent from '../view/task-component.js';
// import TaskBoardComponent from '../view/task-board-component.js';
// import { render } from '../framework/render.js';
// import ClearButtonComponent from '../view/clear-button-component.js'; // Импорт кнопки

// export default class TasksBoardPresenter {
//   tasksBoardComponent = new TaskBoardComponent();

//   constructor({ boardContainer, tasksModel }) {
//     this.boardContainer = boardContainer;
//     this.tasksModel = tasksModel;
//   }

//   init() {
//     this.boardTasks = [...this.tasksModel.getTasks()];

//     // Используем константы Status для создания групп
//     const tasksByStatus = {
//       [Status.BACKLOG]: [],
//       [Status.PROCESSING]: [],
//       [Status.DONE]: [],
//       [Status.BASKET]: []
//     };

//     // Распределяем задачи по статусам
//     for (let i = 0; i < this.boardTasks.length; i++) {
//       const task = this.boardTasks[i];
//       tasksByStatus[task.status].push(task);
//     }

//     // Рендерим доску задач
//     render(this.tasksBoardComponent, this.boardContainer);

//     // Проходим по каждому статусу и рендерим список задач
//     const statuses = Object.keys(tasksByStatus);
//     for (let i = 0; i < statuses.length; i++) {
//       const status = statuses[i];
//       const tasksListComponent = new TasksListComponent({ status });
//       render(tasksListComponent, this.tasksBoardComponent.getElement());

//       // Проходим по каждой задаче внутри данного статуса и рендерим её
//       const tasks = tasksByStatus[status];
//       for (let j = 0; j < tasks.length; j++) {
//         const task = tasks[j];
//         const taskComponent = new TaskComponent({ task });
//         render(taskComponent, tasksListComponent.getElement());
//       }

//       // Если статус "Корзина", добавляем кнопку очистки ниже списка задач
//       if (status === Status.BASKET) {
//         const clearButtonComponent = new ClearButtonComponent();
//         // Рендерим кнопку очистки в родительский элемент списка задач
//         render(clearButtonComponent, tasksListComponent.getElement());
//       }
//     }
//   }
// }
import { Status } from '../const.js'; // Импортируем константы
import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import { render } from '../framework/render.js';
import ClearButtonComponent from '../view/clear-button-component.js'; // Импорт кнопки

export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent(); // Приватное поле
  #boardContainer;
  #tasksModel;
  #boardTasks;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks]; // Используем геттер tasks

    // Используем константы Status для создания групп
    const tasksByStatus = {
      [Status.BACKLOG]: [],
      [Status.PROCESSING]: [],
      [Status.DONE]: [],
      [Status.BASKET]: []
    };

    // Распределяем задачи по статусам
    for (let i = 0; i < this.#boardTasks.length; i++) {
      const task = this.#boardTasks[i];
      tasksByStatus[task.status].push(task);
    }

    this.#renderBoard(tasksByStatus);
  }

// Пример метода #renderBoard
#renderBoard(tasksByStatus) {
  render(this.#tasksBoardComponent, this.#boardContainer);

  const statuses = Object.keys(tasksByStatus);
  for (const status of statuses) {
    const tasksListComponent = new TasksListComponent({ status });
    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasks = tasksByStatus[status];
    for (const task of tasks) {
      this.#renderTask(task, tasksListComponent.element);
    }

    if (status === Status.BASKET) {
      const clearButtonComponent = new ClearButtonComponent();
      render(clearButtonComponent, tasksListComponent.element);
    }
  }
}


  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent.element, container); // Используем element
  }
}
