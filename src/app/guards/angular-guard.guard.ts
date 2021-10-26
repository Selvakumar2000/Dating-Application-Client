import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AngularGuardGuard implements CanActivate, CanActivateChild {

  constructor(private accountService:AccountService, private router:Router) { }

  canActivate(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):boolean{
    let isLoggedIn = this.accountService.isAuthenticated();
    
    if(isLoggedIn)
    {
      return true;
    }
    else
    {
      this.router.navigateByUrl('home');
    }
  }

  canActivateChild(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):boolean{
    return this.canActivate(route,state);
  }
  
}
