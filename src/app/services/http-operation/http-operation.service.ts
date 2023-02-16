import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UtilityService } from '../utility/utility.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpOperationService {

    constructor(
        private httpClient: HttpClient,
        private utilityService: UtilityService
    ) { }

    getRequest(url: string): Observable<any> {
        this.utilityService.onShowLoading();

        return this.httpClient.get<any>(
            url,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            }
        ).pipe(
            map((result) => {
                this.utilityService.onCloseLoading();
                return result;
            }),
            catchError((error: HttpErrorResponse): any => {
                this.utilityService.onCloseLoading();
                return this.handlingError(error);
            }),
        );
    }

    postRequest(url: string, payload: any): Observable<any> {
        this.utilityService.onShowLoading();

        return this.httpClient.post<any>(
            url,
            payload,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            }
        ).pipe(
            map((result) => {
                this.utilityService.onCloseLoading();
                return result;
            }),
            catchError((error: HttpErrorResponse): any => {
                this.utilityService.onCloseLoading();
                return this.handlingError(error);
            }),
        );
    }

    putRequest(url: string, payload: any): Observable<any> {
        this.utilityService.onShowLoading();

        return this.httpClient.patch<any>(
            url,
            payload,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            }
        ).pipe(
            map((result) => {
                this.utilityService.onCloseLoading();
                return result;
            }),
            catchError((error: HttpErrorResponse): any => {
                this.utilityService.onCloseLoading();
                return this.handlingError(error);
            }),
        );
    }

    deleteRequest(url: string): Observable<any> {
        this.utilityService.onShowLoading();

        return this.httpClient.delete<any>(
            url,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            }
        ).pipe(
            map((result) => {
                this.utilityService.onCloseLoading();
                return result;
            }),
            catchError((error: HttpErrorResponse): any => {
                this.utilityService.onCloseLoading();
                return this.handlingError(error);
            }),
        );
    }

    handlingError(error: HttpErrorResponse): any {
        this.utilityService.onShowCustomAlert('error', 'Oops', error.message);
        return throwError(error);
    }
}
