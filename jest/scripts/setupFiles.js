/* Setup files module.
**
** This module will be executed before each test.
**
** This module contains a code to configure or set up the
** testing environment before each test. Since every test
** runs in its own environment, these scripts will be
** executed in the testing environment immediately before
** executing the test code itself.
**
** This module excutes before setupFramework module.
**
*/

import { LocalStorage } from './mocks/localStorage';

const successMesasge = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const error = new Error(errorMessage);

const tasks = [
    {
        id:        "5d88946eb808f5f760f45111",
        message:   "dry code",
        completed: true,
        favorite:  false,
        created:   "2019-09-23T09:46:22.407Z",
        modified:  "2019-09-24T19:03:50.634Z",
    },
    {
        id:        "5d88946eb808f5f760f45000",
        message:   "clean code",
        completed: false,
        favorite:  true,
        created:   "2019-09-23T09:46:22.407Z",
        modified:  "2019-09-24T19:03:50.634Z",
    }
];

const task = {
    id:        "5d88946eb808f5f760f45222",
    message:   "moon light",
    completed: false,
    favorite:  true,
    created:   "2019-09-23T09:46:22.407Z",
    modified:  "2019-09-24T19:03:50.634Z",
};

const responseDataSuccess = {
    data:    tasks,
    message: successMesasge,
};

const responseDataFail = {
    message: errorMessage,
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseSuccess204 = {
    status: 204,
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

global.__ = {
    tasks,
    task,
    error,
    fetchResponseSuccess,
    fetchResponseSuccess204,
    fetchResponseFail400,
};

global.localStorage = new LocalStorage();
global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;
