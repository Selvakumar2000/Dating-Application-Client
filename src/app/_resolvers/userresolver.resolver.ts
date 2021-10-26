import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserresolverResolver implements Resolve<User> {

  constructor(private accountService:AccountService) { }

  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): User | Observable<User> {
    //when the component is loading, this resolve will execute so no need to subscribe
//when click the edit button we need the details then only the component displays the
//user details in the form field    
    let id = route.params['id'];

    let details = this.accountService.getUser(id);
    return details;
  }
}


export interface User{
  id:string;
  name:string;
}