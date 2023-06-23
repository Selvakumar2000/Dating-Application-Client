import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DatingApp';
  users:any;
  
  //componet interaction between appcomponent and angular-features component
  name = "Selvakumar"; 
  name2: any;
  welcome(event:any)
  {
    alert(event);
  }

  //angular routing
  id=1;

  loginUser()
  {
    this.accountService.userLogin();
  }

  logoutUser()
  {
    this.accountService.userLogout();
  }

  constructor(public accountService:AccountService, 
              public presenceService: PresenceService){}

  ngOnInit()
  {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user)
    {
      this.accountService.setCurrentUser(user);
      this.presenceService.createHubConnection(user);
    }  
  }
}