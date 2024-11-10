import { tasks } from '../mock/task.js';
import { generateId } from '../utils.js';

export default class TasksModel {
 #boardtasks = tasks; 
 
 

 #observers = [];
 
 get tasks() {
   return this.#boardtasks;
 }

 getTasksByStatus(status) {
  return this.#boardtasks.filter(task=> task.status === status);
 }



 addTask(title) {
  const newTask = {
    title,
    status: "backlog",
    id: generateId(),
  };
  
  this.#boardtasks.push(newTask);
  this._notifyObservers(); // оповещаем об изменениях
  return newTask;
 }

 clearTasksForTrash() {
  const delTasks = this.#boardtasks.filter(task=> task.status === 'trash');
  this.#boardtasks = this.#boardtasks.filter(task=> task.status !=='trash');
  this._notifyObservers(); // оповещаем об изменениях
  return this.#boardtasks;
 }

 addObserver(observer) {
  this.#observers.push(observer);
 }

 removeObserver(observer) {
  this.#observers = this.#observers.filter((obs) => obs!== observer); 
 }
 _notifyObservers() {
  this.#observers.forEach((observer) => observer());
 }

 
//  updateTaskStatus(taskId, newStatus) {
//   const task = this.#boardtasks.find(task=> task.id === taskId);
//   if(task) {
//     task.status = newStatus;
//     this._notifyObservers();
//   }
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

  this._notifyObservers();
}


}


