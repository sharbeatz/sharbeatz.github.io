import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import { render } from '../framework/render.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import TasksModel from '../model/tasks-model.js';
import { Status, StatusLabel, UserAction } from '../const.js';
import NoTasksComponent from '../view/no-tasks-component.js';
import Observable from '../framework/observable.js';

export default class TasksBoardPresenter {
  #boardContainer;
  #tasksModel;
  #boardTasks = [];
  #tasksBoardComponent = new TaskBoardComponent();
  #clearButtonComponent = null; // Свойство для хранения экземпляра кнопки

 
  constructor({boardContainer, tasksModel}){
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  #handleModelChange(event) {
    // this.#boardTasks = [...this.#tasksModel.tasks]; 
    // this.#clearBoard();
    // this.init();
    switch (event) {
      case UserAction.ADD_TASK:
        case UserAction.UPDATE_TASK:
          case UserAction.DELETE_TASK:
            this.#boardTasks = [...this.#tasksModel.tasks]; // Синхронизация задач
            this.#clearBoard();
            this.#renderBoard();
            // if (this.#renderClearButton) {
            //   this.#renderClearButton.toggleDisabled(!this.#tasksModel.hasBasketTasks());
            // }
            if (this.#clearButtonComponent) {
              this.#clearButtonComponent.toggleDisabled(!this.#tasksModel.hasBasketTasks());
            } 
            break;
            default:
              console.warn(`Необработанный тип события: ${event}`);
    }
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  async init() {
    await this.#tasksModel.init();
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  getTasksByStatus(boardTasks, status) {
    return boardTasks.filter(task=> task.status === status);
   }
 
   #renderClearButton(container) {
    this.#clearButtonComponent = new ClearButtonComponent(); // Создаём экземпляр
    render(this.#clearButtonComponent, container); // Рендерим кнопку
    this.#clearButtonComponent.clearTasks(this.DeleteTasksFromTrash.bind(this)); // Добавляем обработчик
  }
  

  //  async createTask() {
  //   const taskTitle = document.querySelector("#add-task").value;
  //   if (!taskTitle) {
  //     return;
  //   }

  //   try {
  //     await this.#tasksModel.addTask(taskTitle);
  //     document.querySelector('#add-task').value = '';
  //     this.#renderBoard();
  //   }catch (err) {
  //     console.error("Ошибка при создании задачи:", err);
  //   }
  //  }
  
  async createTask() {
    const taskTitle = document.querySelector("#add-task").value;
    if (!taskTitle) {
      return;
    }
  
    try {
      const newTask = await this.#tasksModel.addTask(taskTitle);
      document.querySelector('#add-task').value = '';
      this.#renderTask(newTask);
    } catch (err) {
      console.error("Ошибка при создании задачи:", err);
    }
  }
  
  #renderTask(task) {
    const taskComponent = new TaskComponent({ task });
    const statusContainer = this.#tasksBoardComponent.element.querySelector(`[data-status="${task.status}"]`);
    if (statusContainer) {
      render(taskComponent, statusContainer);
    }
  }
  



//    DeleteTasksFromTrash() {
//     this.#tasksModel.clearTasksForTrash();
//     console.log("Задачи в корзине очищены"); // Проверка
// }

async DeleteTasksFromTrash() {
  try {
      await this.#tasksModel.clearBasketTasks();
  } catch (err) {
      console.error('Ошибка при очистке корзины:', err);
  }
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

  //  #handleTaskDrop(taskId, newStatus, position) {
  //   this.#tasksModel.updateTaskStatus(taskId, newStatus, position);
  // }
  
  async #handleTaskDrop(taskId, newStatus, position) {
    try {
        await this.#tasksModel.updateTaskStatus(taskId, newStatus, position);
    } catch (err) {
        console.error('Ошибка при обновлении статуса задачи:', err);
    }
}





}