import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable }     from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { IUser } from "../interfaces/user.interface";
import { IPage } from "../interfaces/user-page.interface";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class UserService {

    private serverURL='api/users'
    constructor(private http: HttpClient) { }

    getAll():Observable<IUser[]>{
        return this.http.get<IUser[]>(this.serverURL).pipe()
    }

    getById(id:number):Observable<IUser>{
        return this.http.get<IUser>(`${this.serverURL}/${id}`)
        .pipe()
    }

    searchByName(name:string){
        if (!name.trim()) {
            return of([]);
          }
        return this.http.get(`${this.serverURL}/?name=${name}`)
        .pipe()
    }

    create(user:IUser):Observable<any> {
        return this.http.post(this.serverURL,user)
        .pipe()
    }

    delete(user:IUser):Observable<any> {         
         const deleteURL=`${this.serverURL}/${user.id}`;
         return this.http.delete(deleteURL,httpOptions)
         .pipe()
    }

    update(user:IUser):Observable<any> {
        const updateURL=`${this.serverURL}/${user.id}`;
        return this.http.put(updateURL,user)
        .pipe()
    }
}