import { Injectable } from '@angular/core';
//import {Http, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from '../../../../environments/environment';

export class User {
    constructor(
        public ID: string,
        public fname: string,
        public lname: string,
        public email: string,
        public password: string,
        public type: string,
        public club_id: string,
        public club_name: string,
        public num_student_allowed: number,
        public billing: number) { }
}

@Injectable()
export class PostRequestService {
    public backendurl = environment.backendurl;
    public token_key: string;
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService,
    ) { }

    private getAuthHeader(): any {
        let headers = new HttpHeaders().set('Authorization', localStorage.getItem('currentUser'))
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        return ({ 'headers': headers })
    }

    private getNonAuthHeader(): any {
        let headers = new HttpHeaders({ 'Authorization': '' })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        return ({ 'headers': headers })
    }

    public createAccount(body: Object): Observable<any> {
        let bodyString = JSON.stringify(body);
        return this
            .http
            .post(this.backendurl + '/v1/register', bodyString, this.getNonAuthHeader())
            .map(response => {
                if (response['token']) {
                    localStorage.setItem('currentUser', response['token']);
                    localStorage.setItem('tenaga',this.authenticationService.decodeToken(response['token']).tenaga)
                    localStorage.setItem('group',this.authenticationService.decodeToken(response['token']).group)
                    this.authenticationService.announce();            
                } 
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    public updateResume(body: Object): Observable<any> {
        let bodyString = JSON.stringify(body);
        return this
            .http
            .post(this.backendurl + '/v1/resume/update', bodyString, this.getAuthHeader())
            .map(res => {
                return res;

            })
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    public addResume(body: Object): Observable<any> {
        let bodyString = JSON.stringify(body);
        return this
            .http
            .post(this.backendurl + '/v1/resume/add', bodyString, this.getAuthHeader())
            .map(res => {
                return res
            })
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }


    public deleteResume(resume_id: string): Observable<any> {
        let bodyString = JSON.stringify({ "resume_id": resume_id });
        return this
            .http
            .put(this.backendurl + '/v1/resume/delete/' + resume_id, bodyString, this.getAuthHeader())
            .map(res => {
                return res;

            })
            .catch((error: any) => Observable.throw(error|| 'Server error')); //...errors if any
    }

    public stopSubscription(password: string): Observable<any> {
        let bodyString = JSON.stringify({ "password": password });
        return this
            .http
            .post(this.backendurl + '/v1/account/stop', bodyString, this.getAuthHeader())
            .map(res => {
                return res;
            })
            .catch((error: any) => Observable.throw(error||'Server error')); //...errors if any
    }


    public restartSubscription(): Observable<any> {
        let bodyString = JSON.stringify({ "password": "badwolf" });
        return this
            .http
            .post(this.backendurl + '/v1/account/restart', bodyString, this.getAuthHeader())
            .map(res => {
                return res
            })
            .catch((error: any) => Observable.throw(error||'Server error')); //...errors if any
    }

    public updateCard(ccToken: string): Observable<any> {
        let bodyString = JSON.stringify({ "id": ccToken });
        return this
            .http
            .put(this.backendurl + '/v1/account/update-card/' + ccToken, bodyString, this.getAuthHeader())
            .map(res => {
                return res
            })
            .catch((error: any) => Observable.throw(error||'Server error')); //...errors if any
    }

    public deleteAccount(password: string): Observable<any> {
        let bodyString = JSON.stringify({ "password": password });
        return this
            .http
            .post(this.backendurl + '/v1/account/delete', bodyString, this.getAuthHeader())
            .map(res => {
                return res
            })
            .catch((error: any) => Observable.throw(error||'Server error')); //...errors if any
    }

    public updatePassword(password: string, id: string, email: string): Observable<any> {
        return this
            .http
            .post(this.backendurl + '/v1/nonauth/updatepassword', JSON.stringify({ account_email: email, password: password, cust_id: id }))
            .map(res => {
                return res
            })
            .catch((error: any) => Observable.throw(error||'Server error')); //
    }

    public updatePasswordAuth(password: string): Observable<any> {
        let bodyString = JSON.stringify({ "password": password });
        return this
            .http
            .post(this.backendurl + '/v1/account/update-password', bodyString, this.getAuthHeader())
            .map(res => {
                return res
            })
            .catch((error: any) => Observable.throw(error||'Server error')); //
    }

    public updateName(fullname: string): Observable<any> {
        let bodyString = JSON.stringify({ "fullname": fullname });
        return this
            .http
            .post(this.backendurl + '/v1/account/update-fullname', bodyString, this.getAuthHeader())
            .map(res => {
                return res
            })
            .catch((error: any) => Observable.throw(error||'Server error')); //
    }

    public shareLinkEmail(email: string, resume_id: string): Observable<any> {
        let bodyString = JSON.stringify({ "to_email": email, "resume_id":resume_id });
        return this
            .http
            .post(this.backendurl + '/v1/resume/share-resume', bodyString, this.getAuthHeader())
            .map(res => {
                return res
            })
            .catch((error: any) => Observable.throw(error||'Server error')); //
    }
}

