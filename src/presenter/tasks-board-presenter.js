import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import { render } from '../framework/render.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import TasksModel from '../model/tasks-model.js';
import { Status, StatusLabel } from '../const.js';
import NoTasksComponent from '../view/no-tasks-component.js';

export default class TasksBoardPresenter {
  #boardContainer;
  #tasksModel;
  #boardTasks = [];
  #tasksBoardComponent = new TaskBoardComponent();
 
  constructor({boardContainer, tasksModel}){
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  #handleModelChange() {
    // this.#boardTasks = [...this.#tasksModel.tasks]; 
    this.#clearBoard();
    this.init();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }


  init() {
    this.#boardTasks = [...this.#tasksModel.tasks]
    
    this.#renderBoard();
    console.log(this.#tasksModel.tasks)
  }

  getTasksByStatus(boardTasks, status) {
    return boardTasks.filter(task=> task.status === status);
   }
 
   #renderClearButton(container) {
    const clearButtonComponent = new ClearButtonComponent()
    render(clearButtonComponent, container);
    // clearButtonComponent.clearTasks(this.DeleteTasksFromTrash)
    clearButtonComponent.clearTasks(this.DeleteTasksFromTrash.bind(this)); // Привязываем контекст
   }

   createTask() {
    const taskTitle = document.querySelector("#add-task").value.trim();
    if (!taskTitle) {
      return;
    }
    const newTask = this.#tasksModel.addTask(taskTitle);
    document.querySelector("#add-task").value = '';
   }

   DeleteTasksFromTrash() {
    this.#tasksModel.clearTasksForTrash();
    console.log("Задачи в корзине очищены"); // Проверка
}

   #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    Object.values(Status).forEach(status=> {
      const tasksListComponent = new TasksListComponent({status: status, label: StatusLabel[status], onTaskDrop: this.#handleTaskDrop.bind(this)});
      render (tasksListComponent, this.#tasksBoardComponent.element);

      const tasksForStatus = this.getTasksByStatus(this.#boardTasks, status);
      if (tasksForStatus.length == 0) {
        render(new NoTasksComponent, tasksListComponent.element);
        return;
      }
      tasksForStatus.forEach((task)=> {
        render(new TaskComponent({task}), tasksListComponent.element);
      }
      );
      if (status == Status.TRASH) {
        this.#renderClearButton(tasksListComponent.element);
      }
    }
    )
    
   }

   #handleTaskDrop(taskId, newStatus, position) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus, position);
  }
}