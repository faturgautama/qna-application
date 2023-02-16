import { Action, createReducer, on } from "@ngrx/store";
import * as Actions from '../action/question.action';

export const initialState = {} as any;

const _questionReducer = createReducer(
    initialState,
    // ** Get All
    on(Actions.getAllRequest, (state) => ({ responseResult: true, data: [], message: 'GET ALL REQUEST' })),
    on(Actions.getAllSuccessResponse, (state, { payload }) => ({ responseResult: true, data: payload, message: "GET ALL SUCCESS" })),
    on(Actions.getAllFailedResponse, (state, { payload }) => ({ responseResult: false, data: [], message: "GET ALL FAILED" })),

    // ** Get By Id
    on(Actions.getByIdRequest, (state, payload) => ({ responseResult: true, data: payload, message: 'GET BY ID REQUEST' })),
    on(Actions.getByIdSuccessResponse, (state, { payload }) => ({ responseResult: true, data: payload, message: "GET BY ID SUCCESS" })),
    on(Actions.getByIdFailedResponse, (state, { payload }) => ({ responseResult: false, data: [], message: "GET BY ID FAILED" })),

    // ** Save
    on(Actions.saveRequest, (state, payload) => ({ responseResult: true, data: payload, message: 'SAVE REQUEST' })),
    on(Actions.saveSuccessResponse, (state, { payload }) => ({ responseResult: true, data: payload, message: "SAVE SUCCESS" })),
    on(Actions.saveFailedResponse, (state, { payload }) => ({ responseResult: false, data: [], message: "SAVE FAILED" })),

    // ** Delete
    on(Actions.deleteRequest, (state, payload) => ({ responseResult: true, data: payload, message: 'DELETE REQUEST' })),
    on(Actions.deleteSuccessResponse, (state, { payload }) => ({ responseResult: true, data: payload, message: "DELETE SUCCESS" })),
    on(Actions.deleteFailedResponse, (state, { payload }) => ({ responseResult: false, data: [], message: "DELETE FAILED" })),
);

export function questionReducer(state: any, action: Action) {
    return _questionReducer(state, action);
};


