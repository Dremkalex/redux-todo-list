// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* updateTask ({ payload: updatedTask }) {
    yield put(uiActions.startFetching());

    try {
        const response = yield apply(api, api.tasks.update, [updatedTask]);
        const { data: [updatedTaskFromResponse], message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.updateTask(updatedTaskFromResponse));
    } catch (error) {
        yield put(uiActions.emitError(error, 'updateTask worker'));
    } finally {
        yield put(tasksActions.resetEditTaskId());
        yield put(uiActions.stopFetching());
    }
}
