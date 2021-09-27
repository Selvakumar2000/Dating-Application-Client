import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public memberService:MembersService,public toastr:ToastrService,public router:Router) { }

  canActivate(): boolean {
    if(this.memberService.user) return true;
    this.toastr.error('Registered Users Only Allowed');
    this.router.navigateByUrl('/');
  }

}
