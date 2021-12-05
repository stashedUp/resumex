import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthenticationService {
    public token: string;
    public backendurl = environment.backendurl;

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
    ) {
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(this.backendurl + '/v1/authenticate', JSON.stringify({ account_email: email, password: password }))
            .map((response) => {
                // login successful if there's a jwt token in the response
                let token = response['token'];
                if (token) {
                    this.token = token;
                    localStorage.setItem('tenaga',this.decodeToken(token).tenaga)
                    localStorage.setItem('group',this.decodeToken(token).group)
                    localStorage.setItem('currentUser', this.token);
                    this.announce();
                }
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    resetPassword(email: string): Observable<any> {
        //let backendurl = environment.backendurl;
        return this.http
            .get(this.backendurl + '/v1/authenticate/reset-password/' + email)
            .map((response) => {
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    announce() {
        return this.localStorageService.announceLogin(localStorage.getItem('currentUser'));
    }

    deannounce() {
        return this.localStorageService.announceLogout();
    }

    public logout() {
        // clear token remove user from local storage to log user out
        this.deannounce();

        try {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('tenaga');
            localStorage.removeItem('group');
        }
        catch (err) {
            console.log("there was a slight error");
        }
    }

    public loggedIn(): boolean {
  
        if (!(localStorage.getItem('currentUser'))) {
            return false;
        }
        if (!this.isTokenExpired(localStorage.getItem('currentUser'))) {
            return true;
        } else {
            return false;
        }
    }

    public getTokenExpirationDate(token: string): Date {
        let decoded: any;
        decoded = this.decodeToken(token);

        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }

        let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    public isTokenExpired(token: string, offsetSeconds?: number): boolean {
        let date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (date == null) {
            return false;
        }

        // Token expired?
        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }

    public decodeToken(token: string): any {
        let parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        let decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }

        return JSON.parse(decoded);
    }

    public urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: { break; }
            case 2: { output += '=='; break; }
            case 3: { output += '='; break; }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return this.b64DecodeUnicode(output);
    }

    private b64DecodeUnicode(str: any) {
        return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), (c: any) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    private b64decode(str: string): string {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output: string = '';

        str = String(str).replace(/=+$/, '');

        if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }

        for (
            // initialize result and counters
            let bc: number = 0, bs: any, buffer: any, idx: number = 0;
            // get next character
            buffer = str.charAt(idx++);
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }

}