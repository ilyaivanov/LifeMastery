import {Moment} from "moment";

export interface Day {
  key: string;
  month: string;
  dayOfMonth: string;
  dayOfWeek: string;

  //legacy, to be removed
  day: string;

  isSelected?: boolean;
}

export interface TasksPerDay {
  [index: string]: DailyItem[];
}

export interface ApplicationState {
  tasksPerDay: TasksPerDay;
  selectedDay: string;
}

export interface DailyItem {
  time: Moment;
  isDone: Boolean;
  isFailed: Boolean;
  dailyTime: string;
  title: string;
  id: string;
}
