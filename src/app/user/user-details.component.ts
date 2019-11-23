import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from "../shared/services/user.service";
import { IUser } from "../shared/interfaces/user.interface";


@Component({
    selector: 'user-deteails',
    templateUrl: 'user-details.component.html'
})

export class UserDetailsComponent implements OnInit {    
    user:IUser = { id:null, name:'', age:null, city:''}
    isLoaded:boolean=false;

    constructor(private userService:UserService,
    private route: ActivatedRoute,
    private location: Location, private router:Router
    ) { }

    ngOnInit() {
       this.getUser()
     }

     getUser(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getById(id)
          .subscribe(user => {
              this.user = user
              this.isLoaded = true
            },error=> {
              this.router.navigate(['/pagenotfound']);
             return error; 
          } );
      }

      save(): void {
        this.userService.update(this.user)
          .subscribe(() => this.goBack());
      }

     goBack(): void {
        this.location.back()
      }
}