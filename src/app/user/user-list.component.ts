import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from "../shared/services/user.service";
import { IUser } from "../shared/interfaces/user.interface";
import { animation } from "./user-list.animation";
import { WindowRef } from "../shared/services/window.service";
import { IPage } from "../shared/interfaces/user-page.interface";

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html',
    styleUrls:['user-list.component.css'] ,
    animations:[animation]
})

export class UserListComponent implements OnInit {
    
    users:IUser[];
    selectedUser:IUser;
    searchFilter:any={name:'',city:''}
    orderColumn:string='';
    reverse:boolean=false;
    isLoaded:boolean=false;
    page:number=1;
    itemsPerPage = 5
    userCount:number
    
    constructor(private userService:UserService,
    private router: Router,
    private route: ActivatedRoute,
    private winRef: WindowRef) { }

    loadUsers(){        
        this.isLoaded=false;
        this.userService.getAll().subscribe(
            response=>{
                this.isLoaded=true;           
                 this.users=response;
                 this.userCount = this.users.length
            },
            error=> {                
                return error;
            } 
        );
    }

    selectUser(user:IUser){        
        this.selectedUser=user;
    }

    viewDetails(user:IUser){
        this.router.navigate(['users',user.id]);
    }

    remove(){        
        this.isLoaded=false;
        this.userService.delete(this.selectedUser).subscribe(
            response=>{
                this.isLoaded=true;
                console.log(response);
                this.selectedUser=null;
                this.winRef.nativeWindow.showAlertMessage();
                this.loadUsers();
            },
            error=> console.log(error)
        )
    }

    setOrder(order:string){
        this.orderColumn=order;
        this.reverse=!this.reverse;
    }

    ngOnInit() {        
        this.loadUsers();       
    }

    getPageCount(): number {    
        let count = Math.ceil( this.userCount / this.itemsPerPage )    
        return count
      }
    
    pagesArray():number[]{
        return Array.apply(null, { length: this.getPageCount() })
        .map((value, index) => index + 1);
    }
}