import { generateId } from '../utils.js';
import Observable from '../framework/observable.js';
import { UpdateType, UserAction } from '../const.js';

export default class TasksModel extends Observable {

 #tasksApiService = null;
 #boardtasks = [];


 constructor({tasksApiService}) {
  super();
   this.#tasksApiService = tasksApiService;

 }

 get tasks() {
   return this.#boardtasks;
 }

async init() {
  try {
    const tasks = await this.#tasksApiService.tasks;
    this.#boardtasks = tasks;
    this._notify(UpdateType.INIT); // Уведомляем, что загрузка завершена
  } catch (err) {
    console.log("Ошибка при загрузке задач:", err);
    this.#boardtasks = []; // В случае ошибки можно оставить пустой список задач
    this._notify(UpdateType.INIT); // Даже при ошибке уведомляем
  }
}

 getTasksByStatus(status) {
  return this.#boardtasks.filter(task=> task.status === status);
 }
 
async addTask(title) {
  const newTask = {
    title,
    status: "backlog",
  };
  try {
    const createdTask = await this.#tasksApiService.addTask(newTask);
    this.#boardtasks.push(createdTask);
    this._notify(UserAction.ADD_TASK, createdTask);
    return createdTask;
  } catch (err) {
    console.error("Ошибка при добавлении задачи:", err);
    throw err;
  }
}

deleteTask(taskId) {
  this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
  this._notify(UserAction.DELETE_TASK, { id: taskId });
}

async clearBasketTasks() {
  const basketTasks = this.#boardtasks.filter(task => task.status === 'trash');

  try {
      await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

      this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
      this._notify(UserAction.DELETE_TASK, { status: 'trash' });
  } catch (err) {
      console.error('Ошибка при удалении задач из корзины на сервере:', err);
      throw err;
  }
}

hasBasketTasks() {
  return this.#boardtasks.some(task => task.status === 'trash');
  
}

async updateTaskStatus(taskId, newStatus, position) {
  const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return; // Если задача не найдена, просто выходим

  // Удаляем задачу из текущего списка
  const [task] = this.#boardtasks.splice(taskIndex, 1);
  const previousStatus = task.status; // Сохраняем текущий статус на случай ошибки
  task.status = newStatus;

  try {
    // Отправляем обновлённую задачу на сервер
    const updatedTask = await this.#tasksApiService.updateTask(task);

    // Обновляем задачу локально с данными, пришедшими с сервера
    Object.assign(task, updatedTask);

    // Если позиция указана, вставляем задачу в нужное место
    if (position) {
      const insertIndex = this.#boardtasks.findIndex(t => t.id === position);
      this.#boardtasks.splice(insertIndex, 0, task);
    } else {
      // Если позиция не указана, добавляем задачу в конец списка для нового статуса
      this.#boardtasks.push(task);
    }

    // Уведомляем об обновлении
    this._notify(UserAction.UPDATE_TASK, task);

  } catch (err) {
    console.error('Ошибка при обновлении статуса задачи на сервере:', err);

    // Возвращаем задаче предыдущий статус в случае ошибки
    task.status = previousStatus;

    // Восстанавливаем её в исходное положение
    this.#boardtasks.splice(taskIndex, 0, task);

    throw err; // Прокидываем ошибку дальше
  }
}
}


