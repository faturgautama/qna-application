import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IQuestion, SaveQuestion } from "src/app/models/question.model";

// ** Get All
export const getAllRequest = createAction('[QUESTION] Request Get All');
export const getAllSuccessResponse = createAction('[QUESTION] Request Get All Success Response', props<{ payload: IQuestion[] }>());
export const getAllFailedResponse = createAction('[QUESTION] Request Get All Failed Response', props<{ payload: HttpErrorResponse }>());

// ** Get By Id
export const getByIdRequest = createAction('[QUESTION] Request Get By Id', props<{ payload: { id_question: string } }>());
export const getByIdSuccessResponse = createAction('[QUESTION] Request Get By Id Success Response', props<{ payload: IQuestion }>());
export const getByIdFailedResponse = createAction('[QUESTION] Request Get By Id Failed Response', props<{ payload: HttpErrorResponse }>());

// ** Save
export const saveRequest = createAction('[QUESTION] Request Save', props<{ payload: SaveQuestion }>());
export const saveSuccessResponse = createAction('[QUESTION] Request Save Success Response', props<{ payload: IQuestion }>());
export const saveFailedResponse = createAction('[QUESTION] Request Save Failed Response', props<{ payload: HttpErrorResponse }>());

// ** Save
export const deleteRequest = createAction('[QUESTION] Request Delete', props<{ payload: IQuestion }>());
export const deleteSuccessResponse = createAction('[QUESTION] Request Delete Success Response', props<{ payload: IQuestion }>());
export const deleteFailedResponse = createAction('[QUESTION] Request Delete Failed Response', props<{ payload: HttpErrorResponse }>());
