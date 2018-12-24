import {ApplicationState, TasksPerDay} from "./types";
import {tasksPerDay} from "./tasks";
import {DailyItem} from "../types";
import {createTask} from "../utils";

const initialState: ApplicationState = {
  tasksPerDay: tasksPerDay,
  selectedDay: 'Tue'
};

const dailyTaskReducer = (tasks: DailyItem[], action: any,) => {
  if (action.type === 'REMOVE_TASK')
    return tasks.filter(t => t.id !== action.id);

  if (action.type === 'ADD_TASK')
    return tasks.concat([createTask(action.taskInfo.title, action.taskInfo.date)]);
  //TODO: consider order here by date


  if (action.type === 'FAIL_TASK')
    return tasks.map(t => ({...t, isFailed: t.id === action.taskInfo.id}));

  return tasks;
};

export default (state: ApplicationState = initialState, action: any) => {
  if (action.type === 'REMOVE_TASK' || action.type === 'ADD_TASK') {
    const tasks = Object
      .keys(state.tasksPerDay)
      .reduce((agr: TasksPerDay, day) => {
        agr[day] = state.selectedDay == day ? dailyTaskReducer(state.tasksPerDay[day], action) : state.tasksPerDay[day];
        return agr;
      }, {});

    return {
      ...state,
      tasksPerDay: tasks,
    }
  }

  if (action.type === 'SELECT_DAY') {
    return {
      ...state,
      selectedDay: action.day
    }
  }

  return state;
};
