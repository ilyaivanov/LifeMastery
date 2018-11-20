import "react-native";
import React from "react";
import App from "./App";
import renderer, {Rendered} from "../jest/renderer";

describe('When opening App', () => {
    let app: Rendered;
    beforeEach(() => {
        app = renderer(<App/>);

    });

    it("should renders correctly", () => {
        expect(app.toJSON()).toMatchSnapshot();
    });

    it("by default increment should be 0", () => {
        expect(app.text("countLabel")).toEqual(0);
    });

    describe("when touching a button", () => {
        it("increment should be 1", () => {
            const tree = renderer(<App/>);
            tree.touch("incrementButton");
            expect(tree.text("countLabel")).toEqual(1);
        });
    });

});



