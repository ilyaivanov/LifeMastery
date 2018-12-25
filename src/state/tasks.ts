import {createTask, fromTime} from "../utils";
import {TasksPerDay} from "./types";

export const tasksPerDay: TasksPerDay = {
  Mon: [
    createTask("Monday Task Description 1", fromTime("13:30")),
    createTask("My Task Description 2", fromTime("13:45")),
    createTask("My Task Description 2", fromTime("13:50"))
  ],
  Tue: [
    createTask("Tueday Task Description 1", fromTime("13:30")),
    createTask("My Task Description 2", fromTime("13:45")),
    createTask("My Task Description 2", fromTime("13:50"))
  ]
};

export const todaysTasks = [
  createTask("Get up!", fromTime("6:30")),
  createTask("Task for today's morning", fromTime("10:30"))
];


export const tasksForTomorrow = [
  createTask("Get up!", fromTime("6:30")),
  createTask("Task for tomorrow morning", fromTime("11:00"))
];

export const days = [
  {day: "Mon"},
  {day: "Tue"},
  {day: "Wed"},
  {day: "Thu", isSelected: true},
  {day: "Fri"},
  {day: "Sat"},
  {day: "Sun"}
];
