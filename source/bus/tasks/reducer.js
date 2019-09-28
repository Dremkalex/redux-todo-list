// Core
import { fromJS, Map, List } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
    tasks:           List(),
    newTaskMessage:  '',
    editTaskMessage: '',
    editTaskId:      '',
    tasksFilter:     '',
});

export const tasksReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FILL_TASKS:
            return state.set('tasks', fromJS(payload));

        case types.CREATE_TASK:
            return state.set('tasks', state.get('tasks').unshift(fromJS(payload)));

        case types.REMOVE_TASK:
            return state.set('tasks',
                state.get('tasks').
                    filter((task) => task.get('id')!== payload));

        case types.UPDATE_TASK:
            return state.set('tasks',
                state.get('tasks')
                    .update(state.get('tasks').findIndex((task) => task.get('id') === payload.id),
                        (task) => task.merge(payload)));

        case types.UPDATE_NEW_TASK_MESSAGE:
            return state.set('newTaskMessage', payload);

        case types.UPDATE_EDIT_TASK_MESSAGE:
            return state.set('editTaskMessage', payload);

        case types.SET_EDIT_TASK_ID:
            return state.set('editTaskId', payload);

        case types.RESET_EDIT_TASK_ID:
            return state.set('editTaskId', '');

        case types.UPDATE_TASKS_FILTER:
            return state.set('tasksFilter', payload);

        default:
            return state;
    }
};
