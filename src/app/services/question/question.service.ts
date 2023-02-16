import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnswer } from 'src/app/models/answer.model';
import { IQuestion, SaveQuestion } from 'src/app/models/question.model';
import * as API from '../../api';
import { AnswerService } from '../answer/answer.service';
import { HttpOperationService } from '../http-operation/http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    API = API;

    Answer: IAnswer[] = [];

    constructor(
        private answerService: AnswerService,
        private httpOperationService: HttpOperationService,
    ) { }

    getAllAnswer(): void {
        this.answerService.getAll()
            .subscribe((result) => {
                this.Answer = result;
            })
    }

    getAll(): Observable<IQuestion[]> {
        return this.httpOperationService.getRequest(this.API.QUESTION_GET)
            .pipe(
                map((result) => {
                    let data: any = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_question: key });
                        }
                    }

                    return data;
                })
            )
    }

    getById(id: string): Observable<IQuestion> {
        return this.httpOperationService.getRequest(`${this.API.QUESTION_GET_BY_ID}${id}.json`)
            .pipe(
                map((result) => {
                    result.id_question = id;
                    return result;
                })
            )
    }

    save(data: SaveQuestion): Observable<any> {
        return this.httpOperationService.postRequest(this.API.QUESTION_SAVE, data);
    }

    delete(data: IQuestion): Observable<any> {
        return this.httpOperationService.deleteRequest(`${this.API.QUESTION_DELETE}${data.id_question}.json`);
    }
}
