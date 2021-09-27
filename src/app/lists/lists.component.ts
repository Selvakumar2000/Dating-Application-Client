import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  members :Partial<Member[]>;//partial ->so each one of the properties inside the member is now optional
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination : Pagination;
  loading = false;

  constructor(public memberService : MembersService,public accountService:AccountService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes()
  {
    this.loading=true;
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(
      response =>
      {
        this.members = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    )
  }

  pageChanged(event:any)
  {
    this.pageNumber = event.page;
    this.loadLikes();
  }

}
