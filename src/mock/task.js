import { Status } from '../const.js'; // Импортируем константы

export const tasks = [
  {
    id: '1',
    title: 'Выучить JS',
    status: Status.BACKLOG,
  },
  {
    id: '2',
    title: 'Выучить React',
    status: Status.BACKLOG,
  },
  {
    id: '3',
    title: 'Сделать лабораторную',
    status: Status.PROCESSING,
  },
  {
    id: '4',
    title: 'Написать отчет',
    status: Status.DONE,
  },
  {
    id: '5',
    title: 'Купить хлеб',
    status: Status.BACKLOG,
  },
  {
    id: '6',
    title: 'Написать эссе',
    status: Status.PROCESSING,
  },
  {
    id: '7',
    title: 'Поспать',
    status: Status.DONE,
  },
  {
    id: '8',
    title: 'Купить кофе-машину',
    status: Status.BASKET,
  },
  {
    id: '9',
    title: 'Проверить работу',
    status: Status.BACKLOG,
  }
];
