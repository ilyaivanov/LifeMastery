import {ApplicationState, DailyItem, TasksPerDay} from "./types";
import {tasksForTomorrow, tasksPerDay, todaysTasks} from "./tasks";
import {createTask} from "../utils";
import {FORMAT} from "./selectors";
import moment from "moment";

const initialState: ApplicationState = {
  tasksPerDay: tasksPerDay,
  selectedDay: "SET IN INITIALIZE ACTION",
  firstDayOfTheDisplayedWeek: '',
};

const dailyTaskReducer = (tasks: DailyItem[], action: any) => {
  if (action.type === "REMOVE_TASK")
    return tasks.filter(t => t.id !== action.id);

  //TODO: consider order here by date
  if (action.type === "ADD_TASK")
    return tasks.concat([
      createTask(action.taskInfo.title, action.taskInfo.date)
    ]);

  if (action.type === "TOGGLE_ITEM")
    return tasks.map((t: any) => ({
      ...t,
      [action.propertyName]:
        t.id === action.id ? !t[action.propertyName] : t[action.propertyName]
    }));

  return tasks;
};

const actions = ["REMOVE_TASK", "ADD_TASK", "TOGGLE_ITEM"];

const addKeyForCurrentDayIfMissing = (state: ApplicationState, keys: string[]) => {
  if (keys.indexOf(state.selectedDay) >= 0)
    return keys;
  else
    return keys.concat([state.selectedDay]);
};

export default (state: ApplicationState = initialState, action: any) => {
  if (actions.indexOf(action.type) >= 0) {
    const tasks = addKeyForCurrentDayIfMissing(state, Object.keys(state.tasksPerDay)).reduce(
      (agr: TasksPerDay, day) => {
        agr[day] =
          state.selectedDay == day
            ? dailyTaskReducer(state.tasksPerDay[day] || [], action)
            : state.tasksPerDay[day];
        return agr;
      },
      {}
    );

    return {
      ...state,
      tasksPerDay: tasks
    };
  }

  if (action.type === 'INITIALIZE') {
    const monday = action.now.clone().startOf('isoWeek').format(FORMAT);

    return {
      ...state,
      tasksPerDay: {
        [action.now.format(FORMAT)]: todaysTasks,
        [action.now.clone().add(1, 'd').format(FORMAT)]: tasksForTomorrow
      },
      selectedDay: action.now.format(FORMAT),
      firstDayOfTheDisplayedWeek: monday,
    }
  }

  if (action.type === "SELECT_DAY") {
    return {
      ...state,
      selectedDay: action.day
    };
  }
  if (action.type === "MOVE_WEEK_FORWARD") {
    return {
      ...state,
      firstDayOfTheDisplayedWeek: moment(state.firstDayOfTheDisplayedWeek, FORMAT).add(7, 'days').format(FORMAT)
    };
  }
  if (action.type === "MOVE_WEEK_BACKWARD") {
    return {
      ...state,
      firstDayOfTheDisplayedWeek: moment(state.firstDayOfTheDisplayedWeek, FORMAT).add(-7, 'days').format(FORMAT)
    };
  }

  return state;
};
