import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnswer, SaveAnswer } from 'src/app/models/answer.model';
import * as API from '../../api';
import { HttpOperationService } from '../http-operation/http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {

    API = API;

    constructor(
        private httpOperationService: HttpOperationService,
    ) { }

    getAll(): Observable<IAnswer[]> {
        return this.httpOperationService.getRequest(this.API.ANSWER_GET)
            .pipe(
                map((result: IAnswer[]) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_answer: key });
                        }
                    };

                    return data;
                })
            );
    }

    getById(id: string): Observable<IAnswer> {
        return this.httpOperationService.getRequest(`${this.API.ANSWER_GET_BY_ID}${id}.json`);
    }

    save(data: SaveAnswer): Observable<any> {
        return this.httpOperationService.postRequest(`${this.API.ANSWER_SAVE}${data.id_question}/answer.json`, data);
    }

    delete(data: IAnswer): Observable<any> {
        return this.httpOperationService.deleteRequest(`${this.API.ANSWER_DELETE}${data.id_question}.json`);
    }
}
