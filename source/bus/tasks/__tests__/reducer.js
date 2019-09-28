// Core
import { Map, List, fromJS } from 'immutable';

// Reducer
import { tasksReducer } from '../reducer';

// Actions
import { tasksActions } from '../actions';

const initialState = Map({
    tasks:           List(),
    newTaskMessage:  '',
    editTaskMessage: '',
    editTaskId:      '',
    tasksFilter:     '',
});

describe('tasks reducer', () => {
    test('should return initial state by default', () => {
        expect(tasksReducer(void 0, {})).toEqual(initialState);
    });

    test('should handle a FILL_TASKS action', () => {
        expect(tasksReducer(void 0, tasksActions.fillTasks(__.tasks))).toEqual(
            initialState.set('tasks', fromJS(__.tasks))
        );
    });

    test('should handle a CREATE_TASK action', () => {
        expect(tasksReducer(void 0, tasksActions.createTask(__.task))).toEqual(
            initialState.set(
                'tasks',
                initialState.get('tasks').unshift(fromJS(__.task))
            )
        );
    });

    test('should handle a REMOVE_TASK action', () => {
        const mockState = initialState.set('tasks', fromJS([__.task]));

        expect(tasksReducer(mockState, tasksActions.removeTask(__.task.id))).toEqual(
            mockState.set(
                'tasks',
                mockState.get('tasks').filter((task) => task.get('id') !== __.task.id)
            )
        );
    });

    test('should handle an UPDATE_TASK action', () => {
        const mockState = initialState.set('tasks', fromJS([__.task]));

        expect(tasksReducer(mockState, tasksActions.updateTask(__.task)))
            .toEqual(mockState.set('tasks',
                mockState.get('tasks')
                    .update(mockState.get('tasks')
                        .findIndex((task) => task.get('id') === __.task.id),
                    (task) => task.merge(__.task))));

    });

    test('should handle an UPDATE_NEW_TASK_MESSAGE action', () => {
        expect(
            tasksReducer(void 0, tasksActions.updateNewTaskMessage(__.task.message)))
            .toEqual(initialState.set('newTaskMessage', __.task.message));
    });

    test('should handle an UPDATE_EDIT_TASK_MESSAGE action', () => {
        expect(
            tasksReducer(void 0, tasksActions.updateEditTaskMessage(__.task.message)))
            .toEqual(initialState.set('editTaskMessage', __.task.message));
    });

    test('should handle an SET_EDIT_TASK_ID action', () => {
        expect(
            tasksReducer(void 0, tasksActions.setEditTaskId(__.task.id)))
            .toEqual(initialState.set('editTaskId', __.task.id));
    });

    test('should handle an RESET_EDIT_TASK_ID action', () => {
        expect(
            tasksReducer(void 0, tasksActions.resetEditTaskId()))
            .toEqual(initialState.set('editTaskId', ''));
    });

    test('should handle an UPDATE_TASKS_FILTER_ID action', () => {
        expect(
            tasksReducer(void 0, tasksActions.updateTasksFilter(__.task.message)))
            .toEqual(initialState.set('tasksFilter', __.task.message));
    });
});
