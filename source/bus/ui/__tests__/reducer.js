// Reducer
import { uiReducer } from "../reducer";

// Actions
import { uiActions } from "../actions";

describe("ui reducer:", () => {
    test("should return initial state by default", () => {
        expect(uiReducer(void 0, {})).toMatchSnapshot();
    });

    test("should handle a START_FETCHING action", () => {
        expect(uiReducer(void 0, uiActions.startFetching())).toMatchSnapshot();
    });

    test("should handle a STOP_FETCHING action", () => {
        expect(
            uiReducer(void 0, uiActions.stopFetching())).toMatchSnapshot();
    });
});
