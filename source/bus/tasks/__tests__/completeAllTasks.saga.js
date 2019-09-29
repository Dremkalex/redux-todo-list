// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';

// Actions
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../../tasks/actions';

// Saga
import { completeAllTasks } from '../saga/workers';

describe('completeAllTasks saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(completeAllTasks, { payload: __.tasks })
            .put(uiActions.startFetching())
            .provide([
                [apply(api, api.tasks.completeAllTasks, [__.tasks]), __.fetchResponseSuccess]
            ])
            .put(tasksActions.fillTasks(__.tasks))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(completeAllTasks, { payload: __.tasks })
            .put(uiActions.startFetching())
            .provide([
                [apply(api, api.tasks.completeAllTasks, [__.tasks]), __.fetchResponseFail400]
            ])
            .put(uiActions.emitError(__.error, 'completeAllTasks worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
