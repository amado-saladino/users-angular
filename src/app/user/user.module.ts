import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms'
import { UserRoutingModule } from "./user-routing.module";
import { UsersComponent } from "./users.component";
import { AddUserComponent } from "./add-user.component";
import { UserDetailsComponent } from "./user-details.component";
import { UserService } from "../shared/services/user.service";
import { WindowRef } from "../shared/services/window.service";
import { UserDetailsGuard } from "./users-guard.service";
import { InMemoryDataService } from 'app/shared/services/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,UserRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AddUserComponent,
    UsersComponent,UserDetailsComponent
  ],
  providers: [ UserDetailsGuard,UserService,WindowRef ]
})
export class UserModule {}