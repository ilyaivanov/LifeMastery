import { ApplicationState, Day, DailyItem } from "./types";
import moment from "moment";

export const FORMAT = "DD MMM YYYY";

export const selectedTasks = (state: ApplicationState) => {
  return state.tasksPerDay[state.selectedDay];
};

export const getDays = (state: ApplicationState): Day[] => {
  const selectedDay = moment(state.selectedDay, "DD MMM YYYY");

  const firstDayOfMonth = selectedDay
    .clone()
    .add(-selectedDay.date() + 1, "days");

  return Array.from(new Array(selectedDay.daysInMonth()))
    .map((ignored: {}, index: number) =>
      firstDayOfMonth.clone().add(index, "days")
    )
    .map(day => ({
      day: "",
      dayOfMonth: day.format("D"),
      month: day.format("MMM"),
      dayOfWeek: weekDays[day.weekday()],
      key: day.format(FORMAT),
      isSelected: day.format(FORMAT) === state.selectedDay
    }));
};

export const selectTasksForDay = (
  state: ApplicationState,
  day: string
): DailyItem[] => state.tasksPerDay[day];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
