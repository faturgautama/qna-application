import { Action, createReducer, on } from "@ngrx/store";
import * as Actions from '../action/register.action';

export const initialState = {} as any;

const _registerReducer = createReducer(
    initialState,
    // ** Register
    on(Actions.registerRequest, (state) => ({ responseResult: true, data: [], message: 'REGISTER REQUEST' })),
    on(Actions.registerSuccessResponse, (state, { payload }) => ({ responseResult: true, data: payload, message: "REGISTER SUCCESS" })),
    on(Actions.registerFailedResponse, (state, { payload }) => ({ responseResult: false, data: [], message: "REGISTER FAILED" })),

    // ** Sign In
    on(Actions.signInRequest, (state) => ({ responseResult: true, data: [], message: 'SIGN IN REQUEST' })),
    on(Actions.signInSuccessResponse, (state, { payload }) => ({ responseResult: true, data: payload, message: "SIGN IN SUCCESS" })),
    on(Actions.signInFailedResponse, (state, { payload }) => ({ responseResult: false, data: [], message: "SIGN IN FAILED" })),
);

export function registerReducer(state: any, action: Action) {
    return _registerReducer(state, action);
};


