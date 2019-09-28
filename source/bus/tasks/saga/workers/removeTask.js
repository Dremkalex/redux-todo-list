// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* removeTask ({ payload: taskId }) {
    yield put(uiActions.startFetching());

    try {
        const response = yield apply(api, api.tasks.remove, [taskId]);

        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        yield put(tasksActions.removeTask(taskId));
    } catch (error) {
        yield put(uiActions.emitError(error, 'removeTask worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
