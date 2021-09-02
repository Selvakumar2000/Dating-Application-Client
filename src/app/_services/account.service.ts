import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //baseURL='https://localhost:5001/api/';
  baseURL=environment.apiUrl; //avoid hard-coded string
  private currentUserSource=new ReplaySubject<User>(1);
  currentUser$=this.currentUserSource.asObservable();

  constructor(public http:HttpClient) { }

  register(model:any)
  {
    //return this.http.post(this.baseURL+'account/Login',model);
    return this.http.post(this.baseURL+'account/Register',model).pipe(
      map((user:User)=>   /* "strict":false to avoid error*/
      {
        if(user)
        {
          this.setCurrentUser(user);
        }
      })
    );
  }

  login(model:any)
  {
    //return this.http.post(this.baseURL+'account/Login',model);
    return this.http.post(this.baseURL+'account/Login',model).pipe(
      map((response:User)=>   /* "strict":false to avoid error*/
      {
        const user=response;
        if(user)
        {
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user:User)
  {
    //convert the object data into the JSON format   setItem(key,value);
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}