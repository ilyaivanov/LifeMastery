import {createMyStore} from "./store";
import {addNewTask, removeItem, selectDay, toggleItem} from "./actions";
import {selectedTasks, selectTasksForDay} from "./selectors";

describe("On 23th of December", () => {
  beforeEach(() => {
    const constantDate = new Date("2018-12-23T00:00:00");
    Date.now = jest.fn().mockReturnValue(constantDate);
  });

  it("by default you should have a couple of tasks on Monday", () => {
    const store = createMyStore();
    expect(selectTasksForDay(store.getState(), "23 Dec 2018")).toHaveLength(2);
  });

  it("by default Tuesday should be selected", () => {
    const store = createMyStore();

    expect(store.getState().selectedDay).toBe("23 Dec 2018");
  });

  describe("When selecting Monday", () => {
    let store: ReturnType<typeof createMyStore>;

    beforeEach(() => {
      store = createMyStore();
    });

    it("should select tasks for that day", () => {
      const tasksAtHand = selectedTasks(store.getState());
      expect(tasksAtHand[0].title).toEqual("Get up!");
    });
  });

  describe("Removing a second task for monday", () => {
    let store: ReturnType<typeof createMyStore>;

    beforeEach(() => {
      store = createMyStore();
      store.dispatch(selectDay("24 Dec 2018"));
      const itemToRemove = selectedTasks(store.getState())[0].id;
      store.dispatch(removeItem(itemToRemove));
    });

    it("should set the length of tasks on that day to two", () => {
      expect(selectTasksForDay(store.getState(), "23 Dec 2018")).toHaveLength(
        2
      );
    });

    it("should not change tasks for Tuesday", () => {
      expect(selectTasksForDay(store.getState(), "24 Dec 2018")).toHaveLength(
        1
      );
    });
  });

  describe("Adding a new task for Monday", () => {
    let store: ReturnType<typeof createMyStore>;

    beforeEach(() => {
      store = createMyStore();
      store.dispatch(selectDay("24 Dec 2018"));
      store.dispatch(addNewTask({title: "Some Task", date: new Date()}));
    });

    it("should set the length of tasks on that day to two", () => {
      const tasksAtHand = selectedTasks(store.getState());
      expect(tasksAtHand).toHaveLength(3);
    });

    it("should have a generated id", () => {
      const task = selectTasksForDay(store.getState(), "24 Dec 2018").find(
        t => t.title === "Some Task"
      ) || {id: undefined};
      expect(task.id).not.toBeFalsy();
    });
  });

  describe('Adding new task for Friday (no tasks for Friday exist)', () => {
    let store: ReturnType<typeof createMyStore>;

    beforeEach(() => {
      store = createMyStore();
      store.dispatch(selectDay("28 Dec 2018"));
      store.dispatch(addNewTask({title: "Some Task", date: new Date()}));
    });

    it("should set the length of tasks on that day to two", () => {
      const tasksAtHand = selectedTasks(store.getState());
      expect(tasksAtHand).toHaveLength(1);
    });

    it("should have a generated id", () => {
      const task = selectTasksForDay(store.getState(), "28 Dec 2018").find(
        t => t.title === "Some Task"
      ) || {id: undefined};
      expect(task.id).not.toBeFalsy();
    });
  });

  describe("Marking first item as done", () => {
    it("should mark it as done", () => {
      const store = createMyStore();

      let firstItem = selectedTasks(store.getState())[0];
      expect(firstItem.isDone).toEqual(false);

      store.dispatch(toggleItem(firstItem.id, "isDone"));

      firstItem = selectedTasks(store.getState())[0];
      expect(firstItem.isDone).toEqual(true);

      store.dispatch(toggleItem(firstItem.id, "isDone"));

      firstItem = selectedTasks(store.getState())[0];
      expect(firstItem.isDone).toEqual(false);
    });
  });
});
