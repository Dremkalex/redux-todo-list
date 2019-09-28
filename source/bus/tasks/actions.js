// Types
import { types } from './types';

export const tasksActions = {
    // Sync
    fillTasks: (tasks) => ({
        type:    types.FILL_TASKS,
        payload: tasks,
    }),

    createTask: (task) => ({
        type:    types.CREATE_TASK,
        payload: task,
    }),

    removeTask: (taskId) => ({
        type:    types.REMOVE_TASK,
        payload: taskId,
    }),

    updateTask: (updatedTask) => ({
        type:    types.UPDATE_TASK,
        payload: updatedTask,
    }),

    updateNewTaskMessage: (message) => ({
        type:    types.UPDATE_NEW_TASK_MESSAGE,
        payload: message,
    }),

    updateEditTaskMessage: (message) => ({
        type:    types.UPDATE_EDIT_TASK_MESSAGE,
        payload: message,
    }),

    updateTasksFilter: (message) => ({
        type:    types.UPDATE_TASKS_FILTER,
        payload: message,
    }),

    setEditTaskId: (editTaskId) => ({
        type:    types.SET_EDIT_TASK_ID,
        payload: editTaskId,
    }),

    resetEditTaskId: () => ({
        type: types.RESET_EDIT_TASK_ID,
    }),

    // Async
    fetchTasksAsync: () => ({
        type: types.FETCH_TASKS_ASYNC,
    }),

    createTaskAsync: (newTaskMessage) => ({
        type:    types.CREATE_TASK_ASYNC,
        payload: newTaskMessage,
    }),

    removeTaskAsync: (taskId) => ({
        type:    types.REMOVE_TASK_ASYNC,
        payload: taskId,
    }),

    updateTaskAsync: (updatedTask) => ({
        type:    types.UPDATE_TASK_ASYNC,
        payload: updatedTask,
    }),

    completeAllTasksAsync: (tasks) => ({
        type:    types.COMPLETE_ALL_TASK_ASYNC,
        payload: tasks,
    }),
};
