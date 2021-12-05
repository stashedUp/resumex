// import { Injectable } from '@angular/core';
// import { Router, NavigationStart } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';

// @Injectable()
// export class AlertExceedService {
//     private subject = new Subject<any>();
//     private keepAfterNavigationChange = false;

//     constructor(private router: Router) {
//         // clear alert message on route change
//         router.events.subscribe(event => {
//             if (event instanceof NavigationStart) {
//                 if (this.keepAfterNavigationChange) {
//                     // only keep for a single location change
//                     this.keepAfterNavigationChange = false;
//                 } else {
//                     // clear alert
//                     this.subject.next();
//                 }
//             }
//         });
//     }

//     success(message: string, keepAfterNavigationChange = false) {
//         this.keepAfterNavigationChange = keepAfterNavigationChange;
//         this.subject.next({ type: 'success', text: message });
//         console.log("went here")
//     }

//     error(message: string, keepAfterNavigationChange = false) {
//         this.keepAfterNavigationChange = keepAfterNavigationChange;
//         this.subject.next({ type: 'error', text: message });
//     }

//     clearAlert() {
//         this.subject.next();
//     }

//     getMessage(): Observable<any> {
//         return this.subject.asObservable();
//     }
// }

///////
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Alert, AlertType } from '../../interfaces/alert';

@Injectable()
export class AlertExceedService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }

    warn(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }

    alert(type: AlertType, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<Alert>{ type: type, message: message });
    }

    clear() {
        // clear alerts
        this.subject.next();
    }
}