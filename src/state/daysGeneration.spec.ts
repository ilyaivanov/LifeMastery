import moment from 'moment';
import {getDays} from "./selectors";
import {createMyStore} from "./store";
import {Day} from "./types";
import {moveWeekBackward, moveWeekForward} from "./actions";

describe('For 23th of December', () => {
  let oldNow: () => number;
  beforeEach(() => {
    oldNow = Date.now;
    const constantDate = new Date('2018-12-23T00:00:00')
    Date.now = jest.fn().mockReturnValue(constantDate)
  });

  afterEach(() => {
    Date.now = oldNow;
  });

  it('should be 23th of December (check if I correctly mocked Date)', () => {
    expect(moment().format("DD MMM")).toEqual('23 Dec');
  });

  describe('when retrieving days ', () => {
    let days: Day[];
    let store: any;
    beforeEach(() => {
      store = createMyStore();
      days = getDays(store.getState());
    });

    it('should get December days by default', () => {
      console.log(moment().format('dddd'))
      expect(days).toHaveLength(7);
    });

    it('first day should be 1 Dec', () => {
      expect(days[0].month).toEqual('Dec');
      expect(days[0].dayOfMonth).toEqual('17');
      expect(days[0].dayOfWeek).toEqual('Mon');
    });

    it('last day should be 31 Dec', () => {
      expect(days[days.length - 1].month).toEqual('Dec');
      expect(days[days.length - 1].dayOfMonth).toEqual('23');
      expect(days[days.length - 1].dayOfWeek).toEqual('Sun');
    });

    it('23th of December should be selected', () => {
      const currentDay = days.find(d => d.dayOfMonth === '23') as any;
      expect(currentDay.isSelected).toEqual(true);
    });

    it('should set displayedWeekStart to 22 Dec 2018', () => {
      expect(store.getState().firstDayOfTheDisplayedWeek).toEqual('17 Dec 2018');
    });
  });


  describe('when moving one week forward', () => {
    let days: Day[];
    beforeEach(() => {
      const store = createMyStore();
      store.dispatch(moveWeekForward());
      days = getDays(store.getState());
    });

    it('a range between 29 Dec and 4 Jan should be displayed', () => {
      expect(days[0].key).toEqual('24 Dec 2018');
    });
  });

  describe('when moving one week backward', () => {
    let days: Day[];
    beforeEach(() => {
      const store = createMyStore();
      store.dispatch(moveWeekBackward());
      days = getDays(store.getState());
    });

    it('a range between 29 Dec and 4 Jan should be displayed', () => {
      expect(days[0].key).toEqual('10 Dec 2018');
    });
  });
});
