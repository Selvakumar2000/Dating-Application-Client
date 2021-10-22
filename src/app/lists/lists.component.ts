import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../_models/member';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { MessageService } from '../_services/message.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  members :Partial<Member[]>;//partial ->so each one of the properties inside the member is now optional
  predicate = 'liked';
  


  constructor(public memberService : MembersService,public accountService:AccountService,
              public router : Router,public presenceService:PresenceService,
              public messageService:MessageService) {

}


  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes()
  {
    this.memberService.getLikes(this.predicate).subscribe(
      response =>
      {
        this.members = response;
      }
    )
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
  }

}
