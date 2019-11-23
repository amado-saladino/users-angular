import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IUser } from "../interfaces/user.interface";
import { IPage } from "../interfaces/user-page.interface";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class UserService {

    private serverURL='http://localhost:9999/api/users';

    constructor(private http: HttpClient) { }

    getAll():Observable<IUser[]>{
        return this.http.get<IUser[]>(this.serverURL)
    }

    getByPage(pageIndex:number,pageSize:number):Observable<IPage>{
        return this.http.get<IPage>(`${this.serverURL}/?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        .pipe()
    }

    getById(id:number):Observable<IUser>{

        return this.http.get<IUser>(`${this.serverURL}/${id}`)
        .pipe()
        //.map(response=>response.json())
        //.catch(error=>error);
    }

    searchByName(name:string){
        return this.http.get(`${this.serverURL}/?name=${name}`)
        .pipe()
        //.map(response=>response.json())
        //.catch(error=>error);
    }

    create(user:IUser):Observable<any> {

        return this.http.post(this.serverURL,user)
        .pipe()
        //.map(response=>response.json())
        //.catch(error=>error);
    }

    delete(user:IUser):Observable<any> {
         
         const deleteURL=`${this.serverURL}/${user.id}`;

         return this.http.delete(deleteURL,httpOptions)
         .pipe()
         //.map(response=>response.json())         
         //.catch(error=>error);
    }

    update(user:IUser):Observable<any> {

        const updateURL=`${this.serverURL}/${user.id}`;

        return this.http.put(updateURL,user)
        .pipe()
        //.map(response=>response.json())
        //.catch(error=>error);
    }

}