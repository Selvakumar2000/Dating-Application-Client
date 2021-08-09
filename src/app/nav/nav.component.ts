import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  users:any;
  model:any={};
  loggedIn:boolean;
  constructor(public service:AccountService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
  }

  login()
  {
    this.service.login(this.model).subscribe(
      response=>
      {
        console.log(response);
        this.loggedIn=true;
        this.users=response;
        console.log('username is '+this.users.username)
      },
      error=>
      {
        console.log(error);
      }
    );
  }

  logout()
  {
    this.service.logout();
    this.loggedIn=false;
  }

  // getCurrentUser()
  // {
  //   this.service.currentUser$.subscribe(
  //     user=>
  //     {
  //       this.loggedIn=!!user; //object turns into boolean
  //     },
  //     error=>
  //     {
  //       console.log(error);
  //     }
  //   )
  // }

}
