import {DailyItem} from "./types";

export const removeItem = (id: string) => ({
  type: 'REMOVE_TASK',
  id
});

export const addNewTask = (taskInfo: { title: string, date: Date }) => ({
  type: 'ADD_TASK',
  taskInfo
});

export const selectDay = (day: string) => ({
  type: 'SELECT_DAY',
  day
});

export const toggleItem = (itemId: string, propertyName: keyof DailyItem) => ({
  type: 'TOGGLE_ITEM',
  propertyName,
  id: itemId
});
