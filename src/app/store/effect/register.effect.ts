import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as fromActions from '../action/register.action';
import { RegisterService } from "src/app/services/register/register.service";

@Injectable()
export class RegisterEffect {

    constructor(
        private action$: Actions,
        private registerService: RegisterService,
    ) { }

    register$ = createEffect(() => this.action$.pipe(
        ofType(fromActions.registerRequest),
        map(action => action.payload),
        mergeMap((data) => this.registerService.createUser(data)
            .pipe(
                map(res => fromActions.registerSuccessResponse({ payload: res.data as any })),
                catchError(error =>
                    of(fromActions.registerFailedResponse({ payload: error.message }))
                )
            )
        ))
    );

    signIn$ = createEffect(() => this.action$.pipe(
        ofType(fromActions.signInRequest),
        map(action => action.payload),
        mergeMap(data =>
            this.registerService.signIn(data)
                .pipe(
                    map(result => fromActions.signInSuccessResponse({ payload: result.data })),
                    catchError(error => of(fromActions.signInFailedResponse({ payload: error })))
                )
        ))
    );
}