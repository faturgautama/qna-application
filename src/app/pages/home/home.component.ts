import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IQuestion } from 'src/app/models/question.model';
import * as questionActions from '../../store/action/question.action';
import * as answerActions from '../../store/action/answer.action';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { SaveAnswer } from 'src/app/models/answer.model';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    // ** User Data
    UserData: IUser = JSON.parse(localStorage.getItem("UserDataQNA") as any);

    // ** List Question
    Questions: IQuestion[] = [];

    // ** Selected Question
    SelectedQuestion: IQuestion = null as any;

    // ** Form
    Form: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private store: Store<{ question: any, answer: any }>,
    ) {

        this.Form = this.formBuilder.group({
            id_question: ['', [Validators.required]],
            answer: ['', [Validators.required]],
            id_user_created: ["", [Validators.required]],
            full_name_created: ["", [Validators.required]],
            time_created: [new Date(), [Validators.required]],
        });

        if (this.UserData) {
            this.id_user_created.setValue(this.UserData.id);
            this.full_name_created.setValue(this.UserData.full_name);
        }
    }

    ngOnInit(): void {
        this.onStoreCondition();

        this.onGetAllQuestion();
    }

    onStoreCondition(): void {
        // ** Call Store Question
        this.store.select('question')
            .subscribe((result) => {
                switch (result.message) {
                    case 'GET ALL SUCCESS':
                        this.Questions = result.data;
                        break;
                    case 'GET BY ID SUCCESS':
                        let answer = [];

                        for (const key in result.data.answer) {
                            if (result.data.answer.hasOwnProperty(key)) {
                                answer.push({ ...result.data.answer[key], id_answer: key });
                            }
                        }

                        this.id_question.setValue(result.data.id_question);

                        this.SelectedQuestion = {
                            id_question: result.data.id_question,
                            question: result.data.question,
                            id_user_created: result.data.id_user_created,
                            full_name_created: result.data.full_name_created,
                            time_created: result.data.time_created,
                            answer: answer,
                        };

                        break;
                    default:
                        break;
                }
            });

        // ** Call Store Answer
        this.store.select('answer')
            .subscribe((result) => {
                switch (result.message) {
                    case 'SAVE SUCCESS':
                        this.utilityService.onShowCustomAlert('success', 'Success', 'Answer Berhasil Dikirim')
                            .then(() => {
                                this.answer.setValue("");
                                this.onGetById(this.id_question.value);
                            })
                        break;
                    default:
                        break;
                }
            })
    }

    onGetAllQuestion(): void {
        this.store.dispatch(questionActions.getAllRequest());
    }

    handleSelectedQuestion(data: any): void {
        this.onGetById(data.id_question);
    }

    onGetById(id_question: string): void {
        this.store.dispatch(questionActions.getByIdRequest({ payload: { id_question: id_question } }))
    }

    handleSubmitAnswer(data: SaveAnswer): void {
        if (this.UserData) {
            this.store.dispatch(answerActions.saveRequest({ payload: data }));
        } else {
            this.utilityService.onShowCustomAlert('warning', 'Oops', 'Mohon Sign In Terlebih Dahulu')
                .then(() => {
                    this.router.navigateByUrl('account');
                })
        }
    }

    ngOnDestroy(): void {
        this.SelectedQuestion = null as any;
    }

    get id_question(): AbstractControl { return this.Form.get('id_question') as AbstractControl }
    get answer(): AbstractControl { return this.Form.get('answer') as AbstractControl }
    get id_user_created(): AbstractControl { return this.Form.get('id_user_created') as AbstractControl }
    get full_name_created(): AbstractControl { return this.Form.get('full_name_created') as AbstractControl }
}
