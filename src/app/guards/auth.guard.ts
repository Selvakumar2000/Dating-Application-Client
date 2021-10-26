import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public memberService:MembersService,public toastr:ToastrService,
              public router:Router) { }

  canActivate(): boolean {
    if(this.memberService.user) return true;
    this.toastr.error('Registered Users Only Allowed');
    this.router.navigateByUrl('/');
  }

}
