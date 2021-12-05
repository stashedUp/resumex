import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { UserAccount } from '../../interfaces/user';

@Injectable()
export class ResumeContentService {

    public content: UserAccount;
    public length: Number;
    public resumeID: string;
    private notify = new Subject<any>();
    private paper_size: number = 1070;
    private notchanged: boolean = true
    notifyObservable$ = this.notify.asObservable();

    constructor() {
    }

    public getPaperSize(): number {
        return this.paper_size;
    }

    public getContent(): UserAccount {
        return this.content;
    }

    public setContent(content: any): void {
        this.content = content;
    }

    public notifyOther(data: any) {
      if (data) {
        this.notify.next(data);
      }
    }

    public GetResumeID(): string {
        return this.resumeID;
    }

    public SetResumeID(resumeID: string): void {
        this.resumeID = resumeID;
    }

    public SetNotChanged(notchanged: boolean): void {
        this.notchanged = notchanged;
    }

    public GetNotChanged(): boolean{
        return this.notchanged;
    }

}





