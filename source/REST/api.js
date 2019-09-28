// Instruments
import { MAIN_URL, TOKEN } from './config';

export const api = {
    tasks: {
        fetch () {
            return fetch(MAIN_URL, {
                method:  'GET',
                headers: {
                    'Authorization': TOKEN,
                },
            });

        },

        create (newTaskMessage) {
            return fetch(MAIN_URL, {
                method:  'POST',
                headers: {
                    'Authorization': TOKEN,
                    'Content-Type':  'application/json',
                },
                body: JSON.stringify({ message: newTaskMessage }),
            });
        },

        remove (taskId) {
            return fetch(`${MAIN_URL}/${taskId}`, {
                method:  'DELETE',
                headers: {
                    Authorization: TOKEN,
                },
            });
        },

        update (updatedTask) {
            return fetch(MAIN_URL, {
                method:  'PUT',
                headers: {
                    Authorization:  TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([updatedTask]),
            });
        },

        completeAllTasks (completedTasks) {
            return fetch(MAIN_URL, {
                method:  'PUT',
                headers: {
                    Authorization:  TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completedTasks),
            });
        },
    },
};
