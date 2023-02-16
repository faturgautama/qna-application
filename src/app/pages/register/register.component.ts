import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register/register.service';
import * as fromActions from '../../store/action/register.action';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    // ** Form Register
    Form: FormGroup;

    // ** Form State
    FormState: 'register' | 'sign_in' = 'sign_in';

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<{ register: any }>,
    ) {
        this.onStoreCondition();

        this.Form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            full_name: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
    }

    onStoreCondition(): void {
        this.store.select('register')
            .subscribe((result) => {
                if (result.message == 'REGISTER SUCCESS') {
                    console.log(result);
                }

                if (result.message == 'SIGN IN SUCCESS') {
                    console.log(result);
                }
            })
    }

    onSetFormState(state: any): void {
        this.FormState = state;
    }

    handleCreateUser(data: IUser): void {
        this.store.dispatch(fromActions.registerRequest({ payload: data }));
    }

    handleSignIn(data: IUser): void {
        this.store.dispatch(fromActions.signInRequest({ payload: data }));
    }

    get username(): AbstractControl { return this.Form.get('username') as AbstractControl }
    get password(): AbstractControl { return this.Form.get('password') as AbstractControl }
    get full_name(): AbstractControl { return this.Form.get('full_name') as AbstractControl }
}
