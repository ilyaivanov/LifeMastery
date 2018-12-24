import {createTask, fromTime} from "../utils";
import {DailyItem} from "../types";

interface TasksPerDay {
  [index: string]: DailyItem[]
}

export const tasksPerDay: TasksPerDay = {
  'Mon': [
    createTask('Monday Task Description 1', fromTime('13:30')),
    createTask('My Task Description 2', fromTime('13:45')),
    createTask('My Task Description 2', fromTime('13:50')),
  ],
  'Tue': [
    createTask('Tueday Task Description 1', fromTime('13:30')),
    createTask('My Task Description 2', fromTime('13:45')),
    createTask('My Task Description 2', fromTime('13:50')),
  ],
}

export const days = [
  {day: 'Mon'},
  {day: 'Tue'},
  {day: 'Wed'},
  {day: 'Thu', isSelected: true},
  {day: 'Fri'},
  {day: 'Sat'},
  {day: 'Sun'},
]
