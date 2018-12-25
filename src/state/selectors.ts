import {ApplicationState, DailyItem, Day} from "./types";
import moment, {Moment} from "moment";

export const FORMAT = "DD MMM YYYY";

export const selectedTasks = (state: ApplicationState) => {
  return state.tasksPerDay[state.selectedDay];
};

const mapWeekday = (date: Moment) => {
  if (date.weekday() === 0)
    return 6;
  else
    return date.weekday() - 1;
};

export const getDays = (state: ApplicationState): Day[] => {
  const selectedDay = moment(state.selectedDay, "DD MMM YYYY");

  const firstDayOfWeek = selectedDay
    .clone()
    .add(-mapWeekday(selectedDay), "days");

  const days = 7;

  return Array.from(new Array(days))
    .map((ignored: {}, index: number) =>
      firstDayOfWeek.clone().add(index, "days")
    )
    .map(day => ({
      day: "",
      dayOfMonth: day.format("D"),
      month: day.format("MMM"),
      dayOfWeek: day.format('ddd'),
      key: day.format(FORMAT),
      isSelected: day.format(FORMAT) === state.selectedDay
    }));
};


export const selectTasksForDay = (
  state: ApplicationState,
  day: string
): DailyItem[] => state.tasksPerDay[day];
