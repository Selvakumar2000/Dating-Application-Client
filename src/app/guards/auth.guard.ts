import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public service:AccountService,public toastr:ToastrService,public route:Router) { }
  canActivate(): Observable<boolean> {
   return this.service.currentUser$.pipe(
     map(user=>
      {
        if(user) return true;
        this.toastr.error('You shall not pass!');  
        this.route.navigateByUrl('/')  
/* To fix :  Not all code paths return a value. 
compilerOptions:{
  "noImplicitReturns": false
} ot add else block
*/
      })
   )
  }
  
}
