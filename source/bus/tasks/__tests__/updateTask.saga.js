// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';

// Actions
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../../tasks/actions';

// Saga
import { updateTask } from '../saga/workers';

describe('updateTask saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(updateTask, { payload: __.task })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.update, [__.task]), __.fetchResponseTaskSuccess]])
            // .apply(__.fetchResponseTaskSuccess, __.fetchResponseTaskSuccess.json)
            .put(tasksActions.updateTask(__.task))
            .put(tasksActions.resetEditTaskId())
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(updateTask, { payload: __.task })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.update, [__.task.id]), __.fetchResponseFail400]])
            // .apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            .put(uiActions.emitError(__.error, 'updateTask worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
