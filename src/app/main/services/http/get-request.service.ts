import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../../interfaces/user';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GetRequestService {
    public backendurl = environment.backendurl;
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

    getInitResume(): Observable<User[]> {
        return this.http
            .get(this.backendurl + '/v1/resume', this.getAuthHeader())
            .map(response => {
                return response
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


    getVersions(): Observable<any> {
        return this.http
            .get(this.backendurl + '/v1/resume/versions', this.getAuthHeader())
            .map(response => {
                return response
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getVersionResume(resume_id: string): Observable<any> {
        return this.http
            .get(this.backendurl + '/v1/resume/' + resume_id, this.getAuthHeader())
            .map(response => {
                return response
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getNonAuthVersionResume(resume_id: string): Observable<any> {
        return this.http
            .get(this.backendurl + '/v1/nonauth/' + resume_id, this.getNonAuthHeader())
            .map(response => {
                return response
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getInvoices(): Observable<any> {
        return this.http
            .get(this.backendurl + '/v1/account/getinvoice', this.getAuthHeader())
            .map(response => {
                return response
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getSubscription(): Observable<any> {
        return this.http
            .get(this.backendurl + '/v1/account/getsubs', this.getAuthHeader())
            .map(response => {
                return response
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getCustCard(): Observable<any> {
        return this.http
            .get(this.backendurl + '/v1/account/getcustcard', this.getAuthHeader())
            .map(response => {
                return response
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getAccountInfo(): Observable<any> {
        return this.http
            .get(this.backendurl + '/v1/account/account-info', this.getAuthHeader())
            .map(response => {
                return response
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
