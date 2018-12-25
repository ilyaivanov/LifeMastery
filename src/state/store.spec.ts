import {createMyStore} from "./store";
import {addNewTask, removeItem, selectDay, toggleItem} from "./actions";
import {selectedTasks} from "./selectors";

it("by default you should have a couple of tasks on Monday", () => {
  const store = createMyStore();
  expect(store.getState().tasksPerDay['Mon']).toHaveLength(3);
});

it('by default Tuesday should be selected', () => {
  const store = createMyStore();
  expect(store.getState().selectedDay).toBe('Tue');
});

describe('When selecting Monday', () => {
  let store: ReturnType<typeof createMyStore>;

  beforeEach(() => {
    store = createMyStore();
    store.dispatch(selectDay('Mon'))
  });

  it('should select tasks for that day', () => {
    const tasksAtHand = selectedTasks(store.getState());
    expect(tasksAtHand[0].title).toEqual("Monday Task Description 1");
  });
});

describe('Removing a second task for monday', () => {
  let store: ReturnType<typeof createMyStore>;

  beforeEach(() => {
    store = createMyStore();
    store.dispatch(selectDay('Mon'));
    const itemToRemove = store.getState().tasksPerDay['Mon'][0].id;
    store.dispatch(removeItem(itemToRemove))
  });

  it('should set the length of tasks on that day to two', () => {
    expect(store.getState().tasksPerDay['Mon']).toHaveLength(2);
  });

  it('should not change tasks for Tuesday', () => {
    expect(store.getState().tasksPerDay['Tue']).toHaveLength(3);
  });
});

describe('Adding a new task for Monday', () => {
  let store: ReturnType<typeof createMyStore>;

  beforeEach(() => {
    store = createMyStore();
    store.dispatch(selectDay('Mon'));
    store.dispatch(addNewTask({title: 'Some Task', date: new Date()}));
  });

  it('should set the length of tasks on that day to two', () => {
    const tasksAtHand = selectedTasks(store.getState());
    expect(tasksAtHand).toHaveLength(4);
  });

  it('should have a generated id', () => {
    const task = store.getState().tasksPerDay['Mon'].find(t => t.title === 'Some Task') || {id: undefined};
    expect(task.id).not.toBeFalsy();
  });

  it('should not change tasks for Tuesday', () => {
    expect(store.getState().tasksPerDay['Tue']).toHaveLength(3);
  });
});

describe('Marking first item as done', () => {
  it('should mark it as done', () => {
    const store = createMyStore();

    let firstItem = selectedTasks(store.getState())[0];
    expect(firstItem.isDone).toEqual(false);

    store.dispatch(toggleItem(firstItem.id, 'isDone'));

    firstItem = selectedTasks(store.getState())[0];
    expect(firstItem.isDone).toEqual(true);

    store.dispatch(toggleItem(firstItem.id, 'isDone'));

    firstItem = selectedTasks(store.getState())[0];
    expect(firstItem.isDone).toEqual(false);
  });
});
