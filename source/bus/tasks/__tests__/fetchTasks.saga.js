// Core
import { put, apply } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";

// Instruments
import { api } from "../../../REST";
import { uiActions } from "../../ui/actions";
import { tasksActions } from "../../tasks/actions";
import { fetchTasks } from "../saga/workers";

const fetchTasksAction = tasksActions.fetchTasksAsync();
const saga = cloneableGenerator(fetchTasks)(fetchTasksAction);
let clone = null;

describe("fetchTasks saga:", () => {
    describe("should pass until response received", () => {
        test('should dispatch "startFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });

        test("should call a fetch request", () => {
            expect(saga.next().value).toEqual(apply(api, api.tasks.fetch));
            clone = saga.clone();
        });
    });

    describe("should handle a 400 status response", () => {
        test("the fetch request should return 400 status response", () => {
            expect(clone.next(__.fetchResponseFail400).value).toEqual(
                apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            );
        });

        test("should contain a response data object", () => {
            expect(clone.next(__.responseDataFail).value).toEqual(
                put(uiActions.emitError(__.error, 'fetchTasks worker'))
            );
        });

        test('should dispatch "stopFetching" action', () => {
            expect(clone.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(clone.next().done).toBe(true);
        });
    });

    describe("should handle a 200 status response", () => {
        test("the fetch request should return 200 status response", () => {
            expect(saga.next(__.fetchResponseSuccess).value).toEqual(
                apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
            );
        });

        test('should dispatch "fillTasks" action', () => {
            expect(saga.next(__.responseDataSuccess).value)
                .toMatchSnapshot();
        });

        test('should dispatch "stopFetching" action', () => {
            expect(saga.next().value).toMatchSnapshot();
        });

        test("should finish", () => {
            expect(clone.next().done).toBe(true);
        });
    });
});
