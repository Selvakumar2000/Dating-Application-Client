import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-displayuser',
  templateUrl: './displayuser.component.html',
  styleUrls: ['./displayuser.component.css']
})
export class DisplayuserComponent implements OnInit {

  users:any;
  constructor(public http:HttpClient,private service:AccountService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user:User=JSON.parse(localStorage.getItem('user'));
    this.service.setCurrentUser(user);
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
}
