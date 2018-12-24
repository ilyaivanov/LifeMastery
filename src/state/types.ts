import {DailyItem} from "../types";

export interface Day {
  day: string;
  isSelected?: boolean;
}

export interface TasksPerDay {
  [index: string]: DailyItem[];
}

export interface ApplicationState {
  label: string;
  tasksPerDay: TasksPerDay;
  selectedDay:string;
}
