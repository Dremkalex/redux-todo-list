// Core
import { Map } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
    isTasksFetching: false,
});

export const uiReducer = (state = initialState, { type }) => {
    switch (type) {
        case types.START_FETCHING:
            return state.set('isTasksFetching', true);

        case types.STOP_FETCHING:
            return state.set('isTasksFetching', false);

        default:
            return state;
    }
};
