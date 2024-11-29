  import TasksListComponent from '../view/tasks-list-component.js';
  import TaskComponent from '../view/task-component.js';
  import TaskBoardComponent from '../view/task-board-component.js';
  import { render } from '../framework/render.js';
  import ClearButtonComponent from '../view/clear-button-component.js';
  import TasksModel from '../model/tasks-model.js';
  import { Status, StatusLabel, UserAction } from '../const.js';
  import NoTasksComponent from '../view/no-tasks-component.js';
  import Observable from '../framework/observable.js';
  import LoadingViewComponent from '../view/loading-view-component.js';
  import { UpdateType } from '../const.js'; 

  export default class TasksBoardPresenter {
    #boardContainer;
    #tasksModel;
    #boardTasks = [];
    #tasksBoardComponent = new TaskBoardComponent();
    #clearButtonComponent = null; // Свойство для хранения экземпляра кнопки
    #loadingComponent = new LoadingViewComponent(); // Компонент загрузки
    #isLoading = true; // Флаг для проверки состояния загрузки

    constructor({boardContainer, tasksModel}){
      this.#boardContainer = boardContainer;
      this.#tasksModel = tasksModel;
      this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }
    
    #handleModelChange(event) {
      switch (event) {
        case UserAction.ADD_TASK:
        case UserAction.UPDATE_TASK:
        case UserAction.DELETE_TASK:
          this.#boardTasks = [...this.#tasksModel.tasks]; // Синхронизация задач
          this.#clearBoard();
          this.#renderBoard();
          
          // Обновляем состояние кнопки
          if (this.#clearButtonComponent) {
            this.#clearButtonComponent.toggleDisabled(!this.#tasksModel.hasBasketTasks());
          }
          break;
    
        case UpdateType.INIT:
          this.#clearBoard();
          this.#renderBoard();
          break;
    
        default:
          console.warn('Необработанный тип события:', event);
      }
    }
    
     
    #clearBoard() {
      this.#tasksBoardComponent.element.innerHTML = '';
      // Если был рендеринг компонента загрузки, удаляем его
      if (this.#isLoading) {
        this.#loadingComponent.element.remove();
        this.#loadingComponent = null;
      }
    }

    async init() {
 
      render(this.#loadingComponent, this.#boardContainer);

      try {
        await this.#tasksModel.init();
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#isLoading = false;
        this.#clearBoard();
        this.#renderBoard();
      } catch (err) {
        this.#isLoading = false;
        this.#clearBoard();
      }
    }

    getTasksByStatus(boardTasks, status) {
      return boardTasks.filter(task=> task.status === status);
    }
  
    #renderClearButton(container) {
      this.#clearButtonComponent = new ClearButtonComponent(); // Создаём экземпляр
      render(this.#clearButtonComponent, container); // Рендерим кнопку
      this.#clearButtonComponent.clearTasks(this.DeleteTasksFromTrash.bind(this)); // Добавляем обработчик
      // Устанавливаем начальное состояние кнопки
      this.#clearButtonComponent.toggleDisabled(!this.#tasksModel.hasBasketTasks());
    }
    
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

    async #handleTaskDrop(taskId, newStatus, position) {
      try {
          await this.#tasksModel.updateTaskStatus(taskId, newStatus, position);
      } catch (err) {
          console.error('Ошибка при обновлении статуса задачи:', err);
      }
  }

  }