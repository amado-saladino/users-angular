import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/services/user.service";
import { IUser } from "../shared/interfaces/user.interface";
import { WindowRef } from "../shared/services/window.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({    
    selector: 'app-add-user',
    templateUrl: 'add-user.component.html'
})

export class AddUserComponent implements OnInit {    
    isLoaded:boolean=true    
    constructor(private userService:UserService,
    private winRef: WindowRef, private router:Router,
    private location:Location) { }
    model:IUser = {id:null, name:'', age:null, city:''}
    submitted = false

    ngOnInit() { }

    add(name:string,age:number,city:string) {
        name= name.trim()
        city = city.trim()
        if (this.isInvalid(name,age,city)) { return;}
        this.isLoaded=false;
        this.userService.create({name,age,city} as IUser).subscribe(
            _=> {
                this.isLoaded=true;
                this.winRef.nativeWindow.showAlertMessage();
                this.router.navigate(['/users']);
            },
            error=>{
                console.log(error);               
            }
        ); 
    }

    isInvalid(name:string,age:number,city:string):boolean {
        let check = false
        if (!name || !age || isNaN(age) || !city) { check = true }
        return check
    }

    goBack(): void {
        this.location.back()
    }

    onSubmit() {
        this.submitted = true
        this.add(this.model.name, this.model.age, this.model.city)
    }
}