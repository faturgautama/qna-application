import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from '../http-operation/http-operation.service';
import * as API from '../../api';
import { IUser } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { UtilityService } from '../utility/utility.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    API = API;

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private httpOperationService: HttpOperationService,
    ) { }

    getAllUser(): Observable<any> {
        return this.httpOperationService.getRequest(this.API.USER_GET_ALL)
            .pipe(
                map((result: IUser[]) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id: key });
                        }
                    };

                    return data;
                })
            )
    }

    checkUserExist(username: string): Observable<any> {
        return this.getAllUser()
            .pipe(
                map((result) => {
                    const checkUser = result.filter((item: IUser) => { return item.username == username });
                    return checkUser.length > 0 ? [true, checkUser[0]] : [false, []];
                })
            );
    }

    createUser(data: IUser): Observable<any> {
        return this.checkUserExist(data.username)
            .pipe(
                map((result) => {
                    if (result[0]) {
                        this.utilityService.onShowCustomAlert('warning', 'Oops', 'User Sudah Terdaftar');
                    } else {
                        this.httpOperationService.postRequest(this.API.USER_SAVE, data)
                            .subscribe((res) => {
                                if (res) {
                                    this.utilityService.onShowCustomAlert('success', 'Success', 'Register Berhasil')
                                        .then(() => {
                                            this.handlingUser(data);
                                        })
                                }
                            })
                    }
                })
            );
    }

    signIn(data: IUser): Observable<any> {
        return this.checkUserExist(data.username)
            .pipe(
                map((result) => {
                    if (result[0]) {
                        this.utilityService.onShowCustomAlert('success', 'Success', 'Sign In Berhasil')
                            .then(() => {
                                this.handlingUser(result[1]);
                            })
                    } else {
                        this.utilityService.onShowCustomAlert('warning', 'Oops', 'Akun Belum Terdaftar');
                    }
                })
            );
    }

    logout(): void {
        this.utilityService.onShowLoading()

        setTimeout(() => {
            this.utilityService.onCloseLoading();

            this.utilityService.onShowCustomAlert("success", "Success", "Logout Berhasil")
                .then(() => {
                    localStorage.clear();
                    this.router.navigateByUrl("");
                })
        }, 2000);
    }

    private handlingUser(data: any): void {
        localStorage.setItem('UserDataQNA', JSON.stringify(data));
        this.router.navigateByUrl('');
    }
}
