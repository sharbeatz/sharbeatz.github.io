import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskComponent from './view/task-component.js';

import {render, RenderPosition} from './framework/render.js';

const bodyContainer= document.querySelector('.board-app'); // Здесь мы создаем константу и кладем туда расположение "где у нас находится класс в HTML" в данном случае <..class="board-app">
const formContainer = document.querySelector('.add-task');
const taskBoardContainer = document.querySelector('.taskboard');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN); // По сути мы говорим "Создай шапку и помести ее туда, где указан путь bodyContainer". Шапка опредлена в header-component.js
render(new FormAddTaskComponent(), formContainer, RenderPosition.AFTERBEGIN);


for(let i = 0; i < 4; i++) {
    render(new TaskBoardComponent(), taskBoardContainer, RenderPosition.BEFOREEND);

    const currentTaskBoard = taskBoardContainer.lastElementChild;

    for (let j = 0; j < 4; j++) {
        const taskComponent = new TaskComponent();
        render(taskComponent, currentTaskBoard, RenderPosition.BEFOREEND);
    }
}
