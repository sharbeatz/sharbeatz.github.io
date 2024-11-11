import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/tasks-model.js';
import ClearButtonComponent from './view/clear-button-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskComponent from './view/task-component.js';
import TasksApiService from './tasks-api-service.js';


import {render, RenderPosition} from './framework/render.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';



const END_POINT = 'https://672215242108960b9cc2d547.mockapi.io';
const taskBoardContainer = document.querySelector('.taskboard');
const bodyContainer= document.querySelector('.board-app'); // Здесь мы создаем константу и кладем туда расположение "где у нас находится класс в HTML" в данном случае <..class="board-app">
const formContainer = document.querySelector('.add-task');

console.log(formContainer)


const tasksModel = new TasksModel({tasksApiService: new TasksApiService(END_POINT)});

const tasksBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskBoardContainer,
    tasksModel
});





   
const formAddTaskComponent = new FormAddTaskComponent ({
    onClick: handleNewTaskButtonClick
})

function handleNewTaskButtonClick() {
    tasksBoardPresenter.createTask();
}

// const clearButtonComponent = new ClearButtonComponent();
// clearButtonComponent.clearTasks(handleClearButtonClick)

// function handleClearButtonClick() {
//     tasksBoardPresenter.DeleteTasksFromTrash();  
//     console.log("Проверка") // не вызывается
// }



render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN); // По сути мы говорим "Создай шапку и помести ее туда, где указан путь bodyContainer". Шапка опредлена в header-component.js
render(formAddTaskComponent, formContainer, RenderPosition.AFTERBEGIN);




// for(let i = 0; i < 4; i++) {
//     render(new TaskBoardComponent(), taskBoardContainer, RenderPosition.BEFOREEND);

//     const currentTaskBoard = taskBoardContainer.lastElementChild;

//     for (let j = 0; j < 4; j++) {
//         const taskComponent = new TaskComponent();
//         render(taskComponent, currentTaskBoard, RenderPosition.BEFOREEND);
//     }
// }

tasksBoardPresenter.init();







 

