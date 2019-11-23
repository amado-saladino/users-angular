import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,CanActivate,Router } from "@angular/router";

@Injectable()
export class UserDetailsGuard implements CanActivate {

    constructor(private _router:Router){}

    canActivate(route:ActivatedRouteSnapshot ) : boolean {        
        let id=+route.url[0].path;

        if (isNaN(id) || id <1 ){
            alert('invalid ID')
            this._router.navigate(['users']);
            return false;
        }
        return true;
    }
}