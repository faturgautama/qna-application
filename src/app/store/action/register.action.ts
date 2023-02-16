import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/models/user.model";

// ** Register Akun
export const registerRequest = createAction('[REGISTER] Request Register Akun', props<{ payload: IUser }>());
export const registerSuccessResponse = createAction('[REGISTER] Register Akun Success Response', props<{ payload: IUser[] }>());
export const registerFailedResponse = createAction('[REGISTER] Register Akun Failed Response', props<{ payload: HttpErrorResponse }>());

// ** Sign In
export const signInRequest = createAction('[REGISTER] Request Sign In', props<{ payload: IUser }>());
export const signInSuccessResponse = createAction('[REGISTER] Sign In Success Response', props<{ payload: IUser }>());
export const signInFailedResponse = createAction('[REGISTER] Sign In Failed Response', props<{ payload: HttpErrorResponse }>());
