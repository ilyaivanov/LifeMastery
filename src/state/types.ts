import {DailyItem} from "../types";

export interface Day {
  day: string;
  isSelected?: boolean;
}

export interface TasksPerDay {
  [index: string]: DailyItem[];
}

export interface ApplicationState {
  tasksPerDay: TasksPerDay;
  selectedDay:string;
}
