import "react-native";
import React from "react";
import CreateTask from "./index";
import renderer, { Rendered } from "../../jest/renderer";
import { DailyItem } from "../types";
import { createTask, testIds } from "../utils";
import moment, { Moment } from "moment";

// Return a fixed timestamp when moment().format() is called
jest.mock("moment", () => () => ({ format: () => "12:30" }));

describe("Having a create task screen", () => {
  let app: Rendered;
  let onDone: (item: DailyItem) => void;
  let onCancel: () => void;
  beforeEach(() => {
    onDone = jest.fn();
    onCancel = jest.fn();
    app = renderer(<CreateTask onDone={onDone} onCancel={onCancel} />);
  });

  describe("when setting inputs data and clicking done", () => {
    let date: Moment;
    beforeEach(() => {
      date = moment();

      app.setText(testIds.textInput, "Sample Task Name");
      app.setDateiOS("CreateTask.DateInputiOS", date.toDate());
      app.touch("OnDone");
    });
    afterEach(() => {});

    it("onDone should be called with proper DailyItem", () => {
      const expected = createTask("Sample Task Name", date);
      expected.id = "1";
      expect(onDone).toHaveBeenCalledWith(expected);
    });
  });

  describe("when touching on calncel", () => {
    beforeEach(() => {
      app.touch("OnCancel");
    });

    it("onCancel callback should be called", () => {
      expect(onCancel).toHaveBeenCalled();
    });
  });
});
