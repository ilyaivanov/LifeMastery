import {ApplicationState, TasksPerDay} from "./types";
import {tasksPerDay} from "./tasks";
import {DailyItem} from "../types";
import {createTask} from "../utils";

const initialState: ApplicationState = {
  tasksPerDay: tasksPerDay,
  label: "foo",
  selectedDay: 'Tue'
};

const dailyTaskReducer = (tasks: DailyItem[], action: any, day: string) => {
  if (action.type === 'REMOVE_TASK')
    return tasks.filter(t => t.id !== action.id);

  if (action.type === 'ADD_TASK' && action.taskInfo.onDay === day)
    //TODO: consider order here by date
    return tasks.concat([createTask(action.taskInfo.title, action.taskInfo.date)]);

  if (action.type === 'FAIL_TASK' && action.taskInfo.onDay === day)
    return tasks.map(t => ({...t, isFailed: t.id === action.taskInfo.id}));

  return tasks;
};

export default (state: ApplicationState = initialState, action: any) => {
  if (action.type === 'REMOVE_TASK' || action.type === 'ADD_TASK') {
    const tasks = Object
      .keys(state.tasksPerDay)
      .reduce((agr: TasksPerDay, day) => {
        agr[day] = dailyTaskReducer(state.tasksPerDay[day], action, day);
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
