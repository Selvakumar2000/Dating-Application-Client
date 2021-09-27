import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members:Member[];
  pagination:Pagination;
  userParams:UserParams;
  user:User;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  
  loading = false;

  constructor(public memberService:MembersService, public accountService:AccountService,
              public router:Router) {
    this.userParams = this.memberService.getUserParams();
    this.accountService.currentUser$.pipe(take(1)).subscribe(res => {
      this.userParams.gender = res.gender == 'male'? 'female':'male';
    })
   }
   
  ngOnInit(): void {
    
    this.loadMembers();
  }

  resetFilters()
  {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  loadMembers()
  {
    this.loading=true;
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(
      response=>
      {
        this.loading=false;
        console.log(response);
        this.members=response.result;
        this.pagination=response.pagination;
        
      });
     
  }

  pageChanged(event:any)
  {
    console.log(event);
    this.userParams.pageNumber=event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
  }

}