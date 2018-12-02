import "react-native";
import React from "react";
import App from "./App";
import renderer, {Rendered} from "../jest/renderer";
import {showSecondScreen} from "./navigation";

describe("When opening App", () => {
  let app: Rendered;
  beforeEach(() => {
    app = renderer(<App componentId="compId"/>);
  });

  it("should renders correctly", () => {
    expect(app.toJSON()).toMatchSnapshot();
  });

  it("should have a title", () => {
    expect(app.text("PageTitle")).toEqual('First Screen');
  });

  describe("when going next", () => {
    beforeEach(() => {
      app.touch("GoNext");
    });

    it("showSecondScreen should be called", () => {
      expect(showSecondScreen).toHaveBeenCalledWith('compId')
    });
  });
});
