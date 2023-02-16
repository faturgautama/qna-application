import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import * as fromActions from '../action/question.action';
import { QuestionService } from "src/app/services/question/question.service";

@Injectable()
export class QuestionEffect {

    constructor(
        private action$: Actions,
        private questionService: QuestionService,
    ) { }

    getAll$ = createEffect(() => this.action$.pipe(
        ofType(
            fromActions.getAllRequest,
            fromActions.saveRequest,
        ),
        switchMap(() => this.questionService.getAll()
            .pipe(
                map(res => fromActions.getAllSuccessResponse({ payload: res as any })),
                catchError(error =>
                    of(fromActions.getAllFailedResponse({ payload: error.message }))
                )
            )
        ))
    );

    getById$ = createEffect(() => this.action$.pipe(
        ofType(fromActions.getByIdRequest),
        map(action => action.payload),
        mergeMap(data =>
            this.questionService.getById(data.id_question)
                .pipe(
                    map(result => fromActions.getByIdSuccessResponse({ payload: result })),
                    catchError(error => of(fromActions.getByIdFailedResponse({ payload: error })))
                )
        ))
    );

    save$ = createEffect(() => this.action$.pipe(
        ofType(fromActions.saveRequest),
        map(action => action.payload),
        mergeMap(data =>
            this.questionService.save(data)
                .pipe(
                    map(result => fromActions.saveSuccessResponse({ payload: result })),
                    catchError(error => of(fromActions.saveFailedResponse({ payload: error })))
                )
        ))
    );

    delete$ = createEffect(() => this.action$.pipe(
        ofType(fromActions.deleteRequest),
        map(action => action.payload),
        mergeMap(data =>
            this.questionService.delete(data)
                .pipe(
                    map(result => fromActions.deleteSuccessResponse({ payload: result })),
                    catchError(error => of(fromActions.deleteFailedResponse({ payload: error })))
                )
        ))
    );
}