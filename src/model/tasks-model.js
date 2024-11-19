// import { tasks } from '../mock/task.js';
import { generateId } from '../utils.js';
import Observable from '../framework/observable.js';
import { UpdateType, UserAction } from '../const.js';

export default class TasksModel extends Observable {
//  #boardtasks = tasks; 
 #tasksApiService = null;
 #boardtasks = [];


 constructor({tasksApiService}) {
  super();
   this.#tasksApiService = tasksApiService;
   this.#tasksApiService.tasks.then((tasks) => {
     console.log(tasks);
   });
 }

 

//  #observers = [];
 
 get tasks() {
   return this.#boardtasks;
 }

 async init() {
  try {
    const tasks = await this.#tasksApiService.tasks;
    this.#boardtasks = tasks;
  } 
  catch(err) {
    this.#boardtasks = [];
  }
  this._notify(UpdateType.INIT);
}


 getTasksByStatus(status) {
  return this.#boardtasks.filter(task=> task.status === status);
 }
 
 async addTask(title) {
  const newTask = {
    title,
    status: "backlog",
    id: generateId(),
  };
  try{
    const createdTask = await this.#tasksApiService.addTask(newTask);
    this.#boardtasks.push(createdTask);
    this._notify(UserAction.ADD_TASK, createdTask);
    return createdTask;
  }catch (err) {
    console.log("Ошибка при добавлении задачи на сервере:", err);
    throw err;
  }
 
 }

 clearTasksForTrash() {
  const delTasks = this.#boardtasks.filter(task=> task.status === 'trash');
  this.#boardtasks = this.#boardtasks.filter(task=> task.status !=='trash');
  this._notify(); // оповещаем об изменениях
  return this.#boardtasks;
 }

 hasBasketTasks() {
  return this.tasks.some(task => task.status === 'trash');
}

 // ПАТЕРН НАБЛЮДАТЕЛЬ ПЕРЕНЕСЕН В observable.js
//  addObserver(observer) {
//   this.#observers.push(observer);
//  }

//  removeObserver(observer) {
//   this.#observers = this.#observers.filter((obs) => obs!== observer); 
//  }
//  _notifyObservers() {
//   this.#observers.forEach((observer) => observer());
//  }

 

updateTaskStatus(taskId, newStatus, position) {
  const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return;

  // Удаляем задачу из текущего списка
  const [task] = this.#boardtasks.splice(taskIndex, 1);
  task.status = newStatus;

  // Если позиция указана, находим её индекс и вставляем перед ней
  if (position) {
    console.log("position")
    const insertIndex = this.#boardtasks.findIndex(task => task.id === position);
    this.#boardtasks.splice(insertIndex, 0, task);
  }
  else {
    // Если позиция не указана, добавляем в конец нового статуса
    console.log("1243");
    this.#boardtasks.push(task);

  }
  this._notify();
}


}


