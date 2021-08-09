import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  title:any;
  registerMode=false;
  users:any;  //pass this home component(parent) property to register component(child)
  constructor(public http:HttpClient,public nav:NavComponent) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.title=this.nav.title;
  }

  registerToggle()
  {
    this.registerMode=true;
  }

  getUserDetails()
  {
    this.http.get('https://localhost:5001/api/users').subscribe(
      response=>
      {
        this.users=response;
      },
      error=>
      {
        console.log(error);
      }
    );
  }

  cancelRegisterMode(event:boolean)
  {
    this.registerMode=event;
  }
}
