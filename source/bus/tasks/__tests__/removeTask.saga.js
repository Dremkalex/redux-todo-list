// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';

// Actions
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../../tasks/actions';

// Saga
import { removeTask } from '../saga/workers';

describe('removeTask saga:', () => {
    test('should complete a 204 status response scenario', async () => {
        await expectSaga(removeTask, { payload: __.task.id })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.remove, [__.task.id]), __.fetchResponseSuccess204]])
            .put(tasksActions.removeTask(__.task.id))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(removeTask, { payload: __.task.id })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.remove, [__.task.id]), __.fetchResponseFail400]])
            .apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            .put(uiActions.emitError(__.error, 'removeTask worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
