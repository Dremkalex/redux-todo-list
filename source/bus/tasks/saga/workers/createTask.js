// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* createTask ({ payload: newTaskMessage }) {
    yield put(uiActions.startFetching());

    try {
        const response = yield apply(api, api.tasks.create, [newTaskMessage]);
        const { data: task, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.createTask(task));
        yield put(tasksActions.updateNewTaskMessage(''));
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTask worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
