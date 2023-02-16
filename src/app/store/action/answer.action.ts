import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IAnswer, SaveAnswer } from "src/app/models/answer.model";

// ** Get All
export const getAllRequest = createAction('[ANSWER] Request Get All');
export const getAllSuccessResponse = createAction('[ANSWER] Request Get All Success Response', props<{ payload: IAnswer[] }>());
export const getAllFailedResponse = createAction('[ANSWER] Request Get All Failed Response', props<{ payload: HttpErrorResponse }>());

// ** Get By Id
export const getByIdRequest = createAction('[ANSWER] Request Get By Id', props<{ payload: { id_answer: string } }>());
export const getByIdSuccessResponse = createAction('[ANSWER] Request Get By Id Success Response', props<{ payload: IAnswer }>());
export const getByIdFailedResponse = createAction('[ANSWER] Request Get By Id Failed Response', props<{ payload: HttpErrorResponse }>());

// ** Save
export const saveRequest = createAction('[ANSWER] Request Save', props<{ payload: SaveAnswer }>());
export const saveSuccessResponse = createAction('[ANSWER] Request Save Success Response', props<{ payload: IAnswer }>());
export const saveFailedResponse = createAction('[ANSWER] Request Save Failed Response', props<{ payload: HttpErrorResponse }>());

// ** Save
export const deleteRequest = createAction('[ANSWER] Request Delete', props<{ payload: IAnswer }>());
export const deleteSuccessResponse = createAction('[ANSWER] Request Delete Success Response', props<{ payload: IAnswer }>());
export const deleteFailedResponse = createAction('[ANSWER] Request Delete Failed Response', props<{ payload: HttpErrorResponse }>());
