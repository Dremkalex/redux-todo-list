// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../actions';

export function* completeAllTasks ({ payload: tasks }) {
    yield put(uiActions.startFetching());

    try {
        const completedTasks = yield tasks.map((task) => task.set('completed', true));
        const response = yield apply(api, api.tasks.completeAllTasks, [completedTasks]);
        const { data: completedTasksFromResponse, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.fillTasks(completedTasksFromResponse));
    } catch (error) {
        yield put(uiActions.emitError(error, 'completeAllTasks worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
