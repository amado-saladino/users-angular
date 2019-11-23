import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { UserService } from 'app/shared/services/user.service';
import { IUser } from 'app/shared/interfaces/user.interface';

@Component({
    selector: 'app-search-user',
    templateUrl: 'search-user.component.html',
    styleUrls: ['search-user.component.css']
})

export class SearchComponent implements OnInit {
    users$: Observable<any>;
    private searchTerms = new Subject<string>();

    constructor(private userService: UserService) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit():void {
        this.users$ = this.searchTerms.pipe(
            debounceTime(300),      
            distinctUntilChanged(),      
            switchMap((term: string) => this.userService.searchByName(term)),
          );
    }
}