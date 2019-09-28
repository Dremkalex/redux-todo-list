// Actions
import { tasksActions } from '../actions';

// Types
import { types } from '../types';

describe('tasks Actions', () => {
    test('fill Tasks', () => {
        expect(tasksActions.fillTasks(__.tasks)).toEqual({
            type:    types.FILL_TASKS,
            payload: __.tasks,
        });
    });

    test('create Task', () => {
        expect(tasksActions.createTask(__.task)).toEqual({
            type:    types.CREATE_TASK,
            payload: __.task,
        });
    });

    test('remove Task', () => {
        expect(tasksActions.removeTask(__.task.id)).toEqual({
            type:    types.REMOVE_TASK,
            payload: __.task.id,
        });
    });

    test('update Task', () => {
        expect(tasksActions.updateTask(__.task)).toEqual({
            type:    types.UPDATE_TASK,
            payload: __.task,
        });
    });

    test('update NewTaskMessage', () => {
        expect(tasksActions.updateNewTaskMessage(__.task.message)).toEqual({
            type:    types.UPDATE_NEW_TASK_MESSAGE,
            payload: __.task.message,
        });
    });

    test('update EditTaskMessage', () => {
        expect(tasksActions.updateEditTaskMessage(__.task.message)).toEqual({
            type:    types.UPDATE_EDIT_TASK_MESSAGE,
            payload: __.task.message,
        });
    });

    test('update TasksFilter', () => {
        expect(tasksActions.updateTasksFilter(__.task.message)).toEqual({
            type:    types.UPDATE_TASKS_FILTER,
            payload: __.task.message,
        });
    });

    test('set EditTask Id', () => {
        expect(tasksActions.setEditTaskId(__.task.id)).toEqual({
            type:    types.SET_EDIT_TASK_ID,
            payload: __.task.id,
        });
    });

    test('reset EditTask Id', () => {
        expect(tasksActions.resetEditTaskId()).toEqual({
            type: types.RESET_EDIT_TASK_ID,
        });
    });

    test('fetch Tasks Async', () => {
        expect(tasksActions.fetchTasksAsync()).toEqual({
            type: types.FETCH_TASKS_ASYNC,
        });
    });

    test('create Task Async', () => {
        expect(tasksActions.createTaskAsync(__.task)).toEqual({
            type:    types.CREATE_TASK_ASYNC,
            payload: __.task,
        });
    });

    test('remove Task Async', () => {
        expect(tasksActions.removeTaskAsync(__.task.id)).toEqual({
            type:    types.REMOVE_TASK_ASYNC,
            payload: __.task.id,
        });
    });

    test('update Task Async', () => {
        expect(tasksActions.updateTaskAsync(__.task)).toEqual({
            type:    types.UPDATE_TASK_ASYNC,
            payload: __.task,
        });
    });

    test('complete All Tasks Async', () => {
        expect(tasksActions.completeAllTasksAsync(__.tasks)).toEqual({
            type:    types.COMPLETE_ALL_TASK_ASYNC,
            payload: __.tasks,
        });
    });
});
