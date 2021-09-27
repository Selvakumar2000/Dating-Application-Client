import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

 
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public accountService:AccountService, public toastr:ToastrService, public router:Router) { }

  canActivate(): Observable<boolean>  {
    return this.accountService.currentUser$.pipe(
      map(user =>{
        if(user.roles.includes('Admin') || user.roles.includes('Moderator'))
        {
          return true;
        }
        this.toastr.error('Only Admin can enter this area');
        this.router.navigateByUrl('/');
      })
    )
  }
  
}
