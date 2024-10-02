import { tasks } from '../mock/task.js';

export default class TasksModel {
 #boardtasks = tasks;

//  getTasks() {
 get tasks() {
   return this.#boardtasks;
 }
}
