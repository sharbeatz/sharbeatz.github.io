import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import { render } from '../framework/render.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import TasksModel from '../model/tasks-model.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer;
  #tasksModel;
  #boardTasks = [];
  #tasksBoardComponent = new TaskBoardComponent();
 
  constructor({boardContainer, tasksModel}){
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks]
    this.#renderboard();
  }

  getTasksByStatus(boardTasks, status) {
    return boardTasks.filter(task=> task.status === status);
   }
   
  #renderboard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
  Object.values(Status).forEach(status => {
    const tasksListComponent = new TasksListComponent({status: status, label: StatusLabel[status]});
    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasksForStatus = this.getTasksByStatus(this.#boardTasks,status);
    tasksForStatus.forEach((task)=> {
      render(new TaskComponent({task}), tasksListComponent.element);
    }
    )
  });
  
}
}











// export default class TasksBoardPresenter {
//   #tasksBoardComponent = new TaskBoardComponent();
//   #boardContainer = null;
//   #tasksModel = null;
//   #boardTasks = [];

//   constructor({ boardContainer, tasksModel }) {
//     this.#boardContainer = boardContainer;
//     this.#tasksModel = tasksModel;
//     this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
//   }

//   init() { 
//     this.#boardTasks = [...this.#tasksModel.tasks]; // Копируем массив задач

//     const tasksByStatus = this.#groupTasksByStatus(this.#boardTasks);
//     this.#renderBoard(tasksByStatus);
//   }

//   #groupTasksByStatus(tasks) {
//     return tasks.reduce((acc, task) => {
//       acc[task.status] = acc[task.status] || [];
//       acc[task.status].push(task);
//       return acc;
//     }, {
//       backlog: [],
//       processing: [],
//       done: [],
//       basket: []
//     });
//   }

//   #renderBoard(tasksByStatus) {
//     this.#clearBoard(); // Очищаем доску перед рендером

//     render(this.#tasksBoardComponent, this.#boardContainer);

//     for (const [status, tasks] of Object.entries(tasksByStatus)) {
//       const tasksListComponent = new TasksListComponent({ status });
//       render(tasksListComponent, this.#tasksBoardComponent.element);

//       tasks.forEach(task => this.#renderTask(task, tasksListComponent.element));

//       if (status === 'basket') {
//         const clearButtonComponent = new ClearButtonComponent();
//         render(clearButtonComponent, tasksListComponent.element);
//       }
//     }
//   }

//   #renderTask(task, container) {
//     const taskComponent = new TaskComponent({ task });
//     render(taskComponent, container);
//   }

//   #clearBoard() {
//     this.#tasksBoardComponent.element.innerHTML = ''; // Очистка контейнера
//   }

//   #handleModelChange() {
//     const tasksByStatus = this.#groupTasksByStatus(this.#tasksModel.tasks);
//     this.#renderBoard(tasksByStatus);
//   }




  
//   createTask() {
//     const taskTitle = document.querySelector('#add-task').value.trim();
//     if (!taskTitle) {
//       return;
//     }
//     this.#tasksModel.addTask(taskTitle); // Создание новой задачи
//     document.querySelector('#add-task').value = ''; // Очистка поля ввода
//   }
// }
