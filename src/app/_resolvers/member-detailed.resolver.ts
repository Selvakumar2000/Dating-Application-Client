import { Injectable } from '@angular/core';
import {Resolve,ActivatedRouteSnapshot} from '@angular/router';
import { Observable} from 'rxjs';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<Member> {

  constructor(public memberService:MembersService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    //route subscribe and unsubscribe the data automatically
    return this.memberService.getMember(route.paramMap.get('username'));
  }
}

/* we can use resolver to go and get any type of data you want if you want to get
your data before you constructs your template.
*/