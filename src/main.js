import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskComponent from './view/task-component.js';

import {render, RenderPosition} from './framework/render.js';

const bodyContainer= document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const TaskBoard = document.querySelector('.taskboard');
const Task = document.querySelector('.task')

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.AFTERBEGIN);
render(new TaskBoardComponent(), TaskBoard, RenderPosition.BEFOREEND);
render(new TaskComponent(), Task, RenderPosition.BEFOREEND);




