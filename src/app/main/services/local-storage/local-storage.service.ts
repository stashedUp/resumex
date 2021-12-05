import { Injectable, OnInit } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {

  private loginAnnouncedSource = new Subject<string>();
  private logoutAnnoucedSource = new Subject<string>();
  private savedNewAnnoucedSource = new Subject<boolean>();

  loginAnnounced$ = this.loginAnnouncedSource.asObservable();
  logoutAnnounced$ = this.logoutAnnoucedSource.asObservable();
  savedNewAnnouced$ = this.savedNewAnnoucedSource.asObservable();

  announceSavedNew(mission: boolean){
    this.savedNewAnnoucedSource.next(mission);
  }

  announceLogin(mission: string) {
    this.loginAnnouncedSource.next(mission);
  }    

  announceLogout(){
    this.logoutAnnoucedSource.next(null);
  }
}