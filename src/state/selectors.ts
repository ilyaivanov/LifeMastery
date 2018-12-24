import {ApplicationState} from "./types";

export const selectedTasks = (state: ApplicationState) => {
  return state.tasksPerDay[state.selectedDay];
};

export const getDays = (state: ApplicationState) => ([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ].map(d => ({
    day: d,
    isSelected: d === state.selectedDay
  }))
);
