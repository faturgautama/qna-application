import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SaveQuestion } from 'src/app/models/question.model';
import { IUser } from 'src/app/models/user.model';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as fromActions from '../../store/action/question.action';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

    // ** User Data
    UserData: IUser = JSON.parse(localStorage.getItem("UserDataQNA") as any);

    // ** Form
    Form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private store: Store<{ question: any }>
    ) {
        this.onStoreCondition();

        this.Form = this.formBuilder.group({
            question: ['', [Validators.required]],
            id_user_created: [this.UserData.id, [Validators.required]],
            full_name_created: [this.UserData.full_name, [Validators.required]],
            time_created: [new Date(), [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.onGetAllQuestion();
    }

    onStoreCondition(): void {
        this.store.select('question')
            .subscribe((result) => {
                switch (result.message) {
                    case 'SAVE SUCCESS':
                        this.utilityService.onShowCustomAlert('success', 'Success', 'Question Berhasil Disimpan')
                            .then(() => {
                                this.onResetForm();
                            });
                        break;
                    case 'GET SUCCESS':
                        // console.log(result);
                        break;
                    default:
                        break;
                }
            })
    }

    onGetAllQuestion(): void {
        this.store.dispatch(fromActions.getAllRequest());
    }

    handleSubmitQuestion(data: SaveQuestion): void {
        this.store.dispatch(fromActions.saveRequest({ payload: data }));
    }

    onResetForm(): void {
        this.question.reset();
    }

    get question(): AbstractControl { return this.Form.get('question') as AbstractControl }
}
