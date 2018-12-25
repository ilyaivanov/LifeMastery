import moment from 'moment';
import {getDays} from "./selectors";
import {createMyStore} from "./store";
import {Day} from "./types";

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
    beforeEach(() => {
      const store = createMyStore();
      days = getDays(store.getState());
    });

    it('should get December days by default', () => {
      expect(days).toHaveLength(31);
    });

    it('first day should be 1 Dec', () => {
      expect(days[0].month).toEqual('Dec');
      expect(days[0].dayOfMonth).toEqual('1');
      expect(days[0].dayOfWeek).toEqual('Sun');
    });

    it('last day should be 31 Dec', () => {
      expect(days[30].month).toEqual('Dec');
      expect(days[30].dayOfMonth).toEqual('31');
      expect(days[30].dayOfWeek).toEqual('Tue');
    });

    it('23th of December should be selected', () => {
      expect(days[22].dayOfMonth).toEqual('23');
      expect(days[22].isSelected).toEqual(true);
    });

  });


});
