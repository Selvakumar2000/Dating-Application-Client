import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import { PresenceService } from './presence.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL=environment.apiUrl; 
  private currentUserSource=new ReplaySubject<User>(1);
  currentUser$=this.currentUserSource.asObservable();

  constructor(public http:HttpClient, public presenceService: PresenceService) { }

  register(model:any)
  {
    return this.http.post(this.baseURL+'account/Register',model).pipe(
      map((user:User)=>   
      {
        if(user)
        {
          this.setCurrentUser(user);
          this.presenceService.createHubConnection(user);
        }
      })
    );
  }

  login(model:any)
  {
    return this.http.post(this.baseURL+'account/Login',model).pipe(
      map((response:User)=>   
      {
        const user=response;
        if(user)
        {
          this.setCurrentUser(user);
          this.presenceService.createHubConnection(user);
        }
      })
    );
  }

  setCurrentUser(user:User)
  {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;//role is may be an array or string
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles); 
    //convert the object data into the JSON format   setItem(key,value);
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  getDecodedToken(token)
  {
    return JSON.parse(atob(token.split('.')[1])); //access the payload
  }
}