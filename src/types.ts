import {Moment} from "moment";

export interface DailyItem {
  time: Moment;
  isDone: Boolean;
  isFailed: Boolean;
  dailyTime: string;
  title: string;
  id: string;
}
