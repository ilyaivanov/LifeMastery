import { testIds } from "./ids";
import generateId from "./generateId";
import { goBack, showCreateTaskScreen } from "../navigation";
import { DailyItem } from "../types";
import moment, { Moment } from "moment";

const fromTime = (time: string) => {
  const [hour, minut] = time.split(":");
  return moment()
    .hour(+hour)
    .minute(+minut);
};

const createTask = (title: string, date: Moment): DailyItem => ({
  id: generateId(),
  title,
  time: date,
  dailyTime: moment(date).format("HH:mm"),
  isDone: false,
  isFailed: false
});

export {
  testIds,
  generateId,
  showCreateTaskScreen,
  goBack,
  createTask,
  fromTime
};
