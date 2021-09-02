import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/User';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styles: [
  ]
})
export class MemberListComponent implements OnInit {

  members:Member[];
  pagination:Pagination;
  userParams:UserParams;
  user:User;
  genderList = [{value : 'male', display:'Males'},{value : 'female', display:'Females'} ] ;

  constructor(public memberService:MembersService, public accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>
    {
      this.user=user;
      this.userParams=new UserParams(user);
    })
   }

  ngOnInit(): void {
    this.loadMembers();
  }

  resetFilters()
  {
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }

  loadMembers()
  {
    this.memberService.getMembers(this.userParams).subscribe(
      response=>
      {
        console.log(response);
        this.members=response.result;
        this.pagination=response.pagination;
      });
  }

  pageChanged(event:any)
  {
    console.log(event);
    this.userParams.pageNumber=event.page;
    this.loadMembers();
  }

}