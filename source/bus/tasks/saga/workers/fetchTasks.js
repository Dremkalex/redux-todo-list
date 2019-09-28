// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* fetchTasks () {
    yield put(uiActions.startFetching());

    try {
        const response = yield apply(api, api.tasks.fetch);
        const { data: tasks, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.fillTasks(tasks));

    } catch (error) {
        yield put(uiActions.emitError(error, 'fetchTasks worker'));

    } finally {
        yield put(uiActions.stopFetching());
    }
}
