import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL='https://localhost:5001/api/';
  private currentUserSource=new ReplaySubject<User>(1);
  currentUser$=this.currentUserSource.asObservable();

  constructor(public http:HttpClient) { }

  // register(model:any)
  // {
  //   //return this.http.post(this.baseURL+'account/Login',model);
  //   return this.http.post(this.baseURL+'account/Register',model).pipe(
  //     map((response:User)=>   /* "strict":false to avoid error*/
  //     {
  //       const user=response;
  //       if(user)
  //       {
  //         //convert the object data into the JSON format   setItem(key,value);
  //         localStorage.setItem('user',JSON.stringify(user));
  //         this.currentUserSource.next(user);
  //       }
  //     })
  //   );
  // }

  login(model:any)
  {
    //return this.http.post(this.baseURL+'account/Login',model);
    return this.http.post(this.baseURL+'account/Login',model).pipe(
      map((response:User)=>   /* "strict":false to avoid error*/
      {
        const user=response;
        if(user)
        {
          //convert the object data into the JSON format   setItem(key,value);
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user:User)
  {
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
