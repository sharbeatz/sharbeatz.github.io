import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskComponent from './view/task-component.js';

import {render, RenderPosition} from './framework/render.js';

const bodyContainer= document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskBoardContainer = document.querySelector('.taskboard');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.AFTERBEGIN);

for(let i = 0; i < 4; i++) {
    render(new TaskBoardComponent(), taskBoardContainer, RenderPosition.BEFOREEND);

    const currentTaskBoard = taskBoardContainer.lastElementChild;
    
    for (let j = 0; j < 4; j++) {
        const taskComponent = new TaskComponent();
        render(taskComponent, currentTaskBoard, RenderPosition.BEFOREEND);
    }
}
