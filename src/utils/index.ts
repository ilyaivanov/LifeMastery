import {testIds} from './ids';
import generateId from './generateId';
import {goBack, showCreateTaskScreen} from '../navigation';
import {DailyItem} from "../types";
import moment from "moment";

const fromTime = (time: string) => new Date(`Sun Dec 02 2018 ${time}:00 GMT+0200 (EET)`);

const createTask = (title: string, date: Date): DailyItem => ({
  id: generateId(), title, time: date, dailyTime: moment(date).format('hh:mm'), isDone: false, isFailed: false
});

export {
  testIds,
  generateId,
  showCreateTaskScreen,
  goBack,
  createTask,
  fromTime,
}
