import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-displayuser',
  templateUrl: './displayuser.component.html',
  styleUrls: ['./displayuser.component.css']
})
export class DisplayuserComponent implements OnInit {

  //users:any;
  isAvailable:boolean = false;
  
  constructor(/*public http:HttpClient*/) { }

  ngOnInit(): void {
    //this.getUserDetails();
  }

  // getUserDetails()
  // {
  //   this.http.get('https://localhost:5001/api/users').subscribe(
  //     response=>
  //     {
  //       this.users=response;
  //     },
  //     error=>
  //     {
  //       console.log(error);
  //     }
  //   );
  // }
}
