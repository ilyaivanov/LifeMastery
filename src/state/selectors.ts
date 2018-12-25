import { ApplicationState, DailyItem, Day } from "./types";
import moment, { Moment } from "moment";

export const FORMAT = "DD MMM YYYY";

export const selectedTasks = (state: ApplicationState) => {
  return state.tasksPerDay[state.selectedDay];
};

const getDaysForWeek = (firstDay: Moment) => {
  return Array.from(new Array(7)).map((ignored: {}, index: number) =>
    firstDay.clone().add(index, "days")
  );
};

export const getDays = (state: ApplicationState): Day[] => {
  const firstDay = moment(state.firstDayOfTheDisplayedWeek, FORMAT);

  return getDaysForWeek(firstDay).map(day => ({
    day: "",
    dayOfMonth: day.format("D"),
    month: day.format("MMM"),
    dayOfWeek: day.format("ddd"),
    key: day.format(FORMAT),
    isSelected: day.format(FORMAT) === state.selectedDay
  }));
};

export const weekNumber = (state: ApplicationState) =>
  moment(state.firstDayOfTheDisplayedWeek, FORMAT).isoWeek();

export const weekDate = (state: ApplicationState) =>
  moment(state.firstDayOfTheDisplayedWeek, FORMAT).format('YYYY MMMM');



export const selectTasksForDay = (
  state: ApplicationState,
  day: string
): DailyItem[] => state.tasksPerDay[day];
